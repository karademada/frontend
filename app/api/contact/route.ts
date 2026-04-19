import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Schema de validation strict
const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  company: z.string().max(100).trim().optional(),
  email: z.string().email().max(255).toLowerCase().trim(),
  need: z.string().max(100).trim().optional(),
  message: z.string().min(10).max(2000).trim(),
});

// Rate limiting simple (en production, utilisez Redis ou Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 3) { // Max 3 requêtes par minute
    return false;
  }

  limit.count++;
  return true;
}

// Sanitize HTML pour éviter XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export const POST = async (request: NextRequest) => {
  try {
    // Vérifier l'origine (CORS)
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://gntr.fr',
      'https://www.gntr.fr',
      'https://gntrconsulting.fr',
      'https://www.gntrconsulting.fr',
    ];

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Origine non autorisée' },
        { status: 403 }
      );
    }

    // Rate limiting par IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez dans 1 minute.' },
        { status: 429 }
      );
    }

    // Vérifier Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validation avec Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, company, email, need, message } = validationResult.data;

    // Sanitize pour éviter XSS dans les emails
    const sanitizedName = sanitizeHtml(name);
    const sanitizedCompany = company ? sanitizeHtml(company) : 'Non renseignée';
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedNeed = need ? sanitizeHtml(need) : 'Non spécifié';
    const sanitizedMessage = sanitizeHtml(message);

    const { data, error } = await resend.emails.send({
      from: 'GNTR Contact <contact@gntrconsulting.fr>',
      to: 'contact@gntrconsulting.fr',
      replyTo: email,
      subject: `Nouveau contact GNTR: ${sanitizedNeed}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom:</strong> ${sanitizedName}</p>
        <p><strong>Entreprise:</strong> ${sanitizedCompany}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Type de besoin:</strong> ${sanitizedNeed}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
};
