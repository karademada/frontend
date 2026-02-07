"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Code2,
  Cloud,
  Database,
  Shield,
  Brain,
  Smartphone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const expertises = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Developpeurs full-stack, back-end, front-end. Java, Python, TypeScript, Go, Rust et bien plus. Des experts confirmes pour vos projets critiques.",
    tags: ["React", "Node.js", "Java", "Python", ".NET"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Architectes cloud, ingenieurs DevOps et SRE. Migration, infrastructure as code, CI/CD et optimisation de vos environnements cloud.",
    tags: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
  },
  {
    icon: Database,
    title: "Data & IA",
    description:
      "Data engineers, data scientists et specialistes IA/ML. Exploitez la puissance de vos donnees et integrez l'intelligence artificielle.",
    tags: ["Spark", "TensorFlow", "MLOps", "dbt", "Snowflake"],
  },
  {
    icon: Shield,
    title: "Cybersecurite",
    description:
      "Experts en securite applicative, pentest, SOC et conformite. Protegez vos systemes et vos donnees sensibles.",
    tags: ["SIEM", "IAM", "Pentest", "ISO 27001", "RGPD"],
  },
  {
    icon: Brain,
    title: "Conseil & Architecture",
    description:
      "Architectes SI, consultants en transformation digitale et chefs de projets techniques pour piloter vos programmes strategiques.",
    tags: ["TOGAF", "Agile", "SAFe", "Architecture SI"],
  },
  {
    icon: Smartphone,
    title: "Mobile & IoT",
    description:
      "Developpeurs iOS, Android et cross-platform. Ingenieurs embarques et IoT pour vos projets connectes.",
    tags: ["Swift", "Kotlin", "Flutter", "React Native"],
  },
];

export function Expertises() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section header reveal
      gsap.from(".exp-header", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger from bottom with scale
      gsap.from(".exp-card", {
        opacity: 100,
        y: 80,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-grid",
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="expertises" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="exp-header max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Nos expertises
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">
              Une couverture complete de l{"'"}ecosysteme IT
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nous sourcons les meilleurs profils dans chaque domaine
            technologique pour repondre a vos besoins specifiques.
          </p>
        </div>

        <div className="exp-grid mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertises.map((exp) => (
            <div
              key={exp.title}
              className="exp-card group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <exp.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {exp.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
