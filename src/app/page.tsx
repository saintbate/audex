import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import BacktestProof from "@/components/landing/BacktestProof";
import RecentFlags from "@/components/landing/RecentFlags";
import HowItWorks from "@/components/landing/HowItWorks";
import NewsletterSignup from "@/components/landing/NewsletterSignup";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BacktestProof />
        <RecentFlags />
        <HowItWorks />
        <NewsletterSignup />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
