"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Target, Zap, Award, Network } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const values = [
  {
    icon: Target,
    title: "Precision du sourcing",
    description:
      "Chaque profil est pre-qualifie techniquement et culturellement. Nous ne presentons que des candidats qui matchent reellement avec votre besoin.",
  },
  {
    icon: Zap,
    title: "Rapidite d'execution",
    description:
      "Sous 48h, recevez une shortlist de profils qualifies. Notre reseau actif nous permet de reagir vite sans sacrifier la qualite.",
  },
  {
    icon: Award,
    title: "Expertise sectorielle",
    description:
      "Nos equipes connaissent les specificites de chaque secteur : finance, sante, retail, telecom. Cette expertise fait la difference.",
  },
  {
    icon: Network,
    title: "Reseau d'excellence",
    description:
      "Plus de 200 consultants IT triees sur le volet composent notre communaute. Des seniors confirmes, des experts reconnus dans leur domaine.",
  },
];

export function WhyUs() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax on the team image
      gsap.to(".why-image", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Left column text slide in
      gsap.from(".why-header", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Value cards stagger
      gsap.from(".why-card", {
        opacity: 0,
        x: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-cards-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Engagement box
      gsap.from(".why-engagement", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-engagement",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left text */}
          <div className="lg:sticky lg:top-32">
            <div className="why-header">
              <p className="text-sm font-medium tracking-wide text-primary uppercase">
                Pourquoi nous choisir
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                <span className="text-balance">
                  L{"'"}apport d{"'"}affaires IT, reinvente
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                GNTR n{"'"}est pas une ESN classique. Nous sommes un
                accelerateur de connexions entre talents et entreprises, avec
                une approche fondee sur la transparence, la qualite et la
                rapidite.
              </p>
            </div>

            <div
              ref={imageRef}
              className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl"
            >
              <Image
                src="/images/team-meeting.png"
                alt="Equipe GNTR en reunion"
                fill
                className="why-image object-cover will-change-transform"
                style={{ transform: "scale(1.2)" }}
              />
            </div>

            <div className="why-engagement mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <p className="font-display text-sm font-semibold text-primary">
                Notre engagement
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Si le profil propose ne correspond pas a vos attentes dans les 5
                premiers jours, nous le remplacons sans frais supplementaires.
              </p>
            </div>
          </div>

          {/* Right cards */}
          <div className="why-cards-grid grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="why-card rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
