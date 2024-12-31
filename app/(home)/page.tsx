import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Analytics } from "./components/analytics";
import { Pricing } from "./components/pricing";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="overflow-y-scroll max-h-screen">
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="flex flex-col gap-20 py-10">
            <Hero />
            <Features />
            <Analytics />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
