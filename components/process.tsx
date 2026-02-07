"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, Users, Handshake, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Identification du besoin",
    description:
      "Nous analysons en profondeur vos besoins techniques, votre contexte projet et votre culture d'entreprise pour definir le profil ideal.",
  },
  {
    icon: Users,
    step: "02",
    title: "Sourcing & qualification",
    description:
      "Notre reseau de plus de 200 experts IT est active. Chaque profil est rigoureusement evalue sur ses competences techniques et son savoir-etre.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Mise en relation",
    description:
      "Nous organisons les entretiens et facilitons la mise en relation. Vous recevez une shortlist de candidats qualifies sous 48h.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Suivi & accompagnement",
    description:
      "Notre engagement ne s'arrete pas au placement. Nous assurons un suivi continu pour garantir le succes de la mission.",
  },
];

export function Process() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".proc-header", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proc-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animated connecting line
      gsap.from(".proc-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".proc-steps",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Steps stagger with rotation
      gsap.from(".proc-step", {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proc-steps",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Icons spin in
      gsap.from(".proc-icon", {
        scale: 0,
        rotation: -180,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".proc-steps",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="processus"
      className="relative border-t border-border bg-secondary/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="proc-header text-center">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Notre processus
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">Un accompagnement de A a Z</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            De l{"'"}expression du besoin a la mission reussie, nous vous
            accompagnons a chaque etape avec rigueur et transparence.
          </p>
        </div>

        <div className="proc-steps relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="proc-line absolute top-6 left-12 right-12 hidden h-px bg-border lg:block" />

          {steps.map((step) => (
            <div key={step.step} className="proc-step relative">
              <div className="relative flex flex-col items-start">
                <div className="proc-icon flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-4 font-display text-xs font-bold tracking-widest text-primary uppercase">
                  Etape {step.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
