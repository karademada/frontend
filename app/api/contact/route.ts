import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, company, email, need, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'GNTR Contact <onboarding@resend.dev>',
      to: 'contact@gntrconsulting.fr',
      replyTo: email,
      subject: `Nouveau contact: ${need || 'Demande générale'}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Entreprise:</strong> ${company || 'Non renseignée'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type de besoin:</strong> ${need || 'Non spécifié'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
};
