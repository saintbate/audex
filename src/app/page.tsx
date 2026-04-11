import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Architecture from "@/components/landing/Architecture";
import EarlyAccess from "@/components/landing/EarlyAccess";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Architecture />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
