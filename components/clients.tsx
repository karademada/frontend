"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectors = [
  "Banque & Finance",
  "Assurance",
  "E-commerce & Retail",
  "Sante & Pharma",
  "Telecom",
  "Energie & Industrie",
  "Transport & Logistique",
  "Secteur Public",
];

const testimonials = [
  {
    quote:
      "GNTR a su identifier exactement le profil dont nous avions besoin pour piloter notre migration cloud. Un sourcing precis et rapide.",
    author: "Marie Dupont",
    role: "CTO",
    company: "Fintech Leader",
  },
  {
    quote:
      "Leur connaissance du marche IT et la qualite des profils presentes nous ont permis de constituer une equipe data performante en un temps record.",
    author: "Thomas Bernard",
    role: "VP Engineering",
    company: "Scale-up SaaS",
  },
  {
    quote:
      "Un partenaire de confiance qui comprend les enjeux techniques. Les consultants places sont systematiquement au niveau attendu.",
    author: "Sophie Martin",
    role: "DSI",
    company: "Grand Groupe Retail",
  },
];

export function Clients() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header
      gsap.from(".cl-header", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cl-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Sector pills stagger
      gsap.from(".cl-pill", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".cl-pills",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Testimonials parallax-like stagger
      gsap.from(".cl-testimonial", {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cl-testimonials",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="chiffres"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Sectors */}
        <div className="cl-header text-center">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Secteurs d{"'"}intervention
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Ils nous font confiance</span>
          </h2>
        </div>

        <div className="cl-pills mt-12 flex flex-wrap items-center justify-center gap-4">
          {sectors.map((sector) => (
            <div
              key={sector}
              className="cl-pill rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {sector}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="cl-testimonials mt-24 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="cl-testimonial flex flex-col rounded-xl border border-border bg-card p-8"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="mt-6 border-t border-border pt-6">
                <p className="font-display text-sm font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {testimonial.role} — {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
