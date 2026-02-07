"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Left column slide in
      gsap.from(".cta-left", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Right form slide in
      gsap.from(".cta-form", {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Contact items stagger
      gsap.from(".cta-contact-item", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-left",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="contact"
      className="relative border-t border-border bg-secondary/50 py-24 md:py-32"
    >
      {/* Accent glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div className="cta-left">
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Parlons de votre projet
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">
                Pret a trouver votre prochain talent IT ?
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Que vous cherchiez un developpeur senior, un architecte cloud ou
              une equipe complete, nous avons le reseau et l{"'"}expertise pour
              vous accompagner.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="cta-contact-item flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">
                    contact@gntr.fr
                  </p>
                </div>
              </div>
              <div className="cta-contact-item flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telephone</p>
                  <p className="text-sm font-medium text-foreground">
                    +33 1 86 76 00 00
                  </p>
                </div>
              </div>
              <div className="cta-contact-item flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Adresse</p>
                  <p className="text-sm font-medium text-foreground">
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="cta-form rounded-xl border border-border bg-card p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Decrivez votre besoin
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Nous revenons vers vous sous 24h.
            </p>

            <form className="mt-8 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    Entreprise
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Votre entreprise"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Email professionnel
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jean@entreprise.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="need"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Type de besoin
                </label>
                <select
                  id="need"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Selectionnez un besoin</option>
                  <option value="developer">Developpeur / Ingenieur</option>
                  <option value="architect">Architecte / Lead Tech</option>
                  <option value="devops">DevOps / Cloud Engineer</option>
                  <option value="data">Data Engineer / Data Scientist</option>
                  <option value="security">Expert Cybersecurite</option>
                  <option value="team">Equipe complete</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Decrivez votre besoin, les competences recherchees, la duree de la mission..."
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="gap-2">
                Envoyer ma demande
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
