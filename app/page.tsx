import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Expertises } from "@/components/expertises";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { Clients } from "@/components/clients";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Expertises />
        <WhyUs />
        <Process />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
