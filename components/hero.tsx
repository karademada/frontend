"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax on the background image
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero text entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-buttons",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.3"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      {/* Hero image - parallax */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero-tech.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-40">
        <div className="max-w-4xl">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Cabinet de conseil IT
            </span>
          </div>

          <h1 className="hero-title font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">
              Connecter les{" "}
              <span className="text-primary">meilleurs talents tech</span> aux
              projets qui comptent
            </span>
          </h1>

          <p className="hero-desc mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            GNTR est votre partenaire strategique en apport d{"'"}affaires IT.
            Nous identifions, qualifions et mettons en relation les meilleurs
            developpeurs et ingenieurs avec vos projets les plus ambitieux.
          </p>

          <div className="hero-buttons mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="#contact">
                Demarrer un projet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#expertises">Decouvrir nos expertises</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            {[
              { value: "200+", label: "Consultants places" },
              { value: "50+", label: "Clients accompagnes" },
              { value: "98%", label: "Taux de satisfaction" },
              { value: "48h", label: "Delai moyen de sourcing" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat">
                <p className="font-display text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
