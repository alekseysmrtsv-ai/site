import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import ComparisonSection from "@/components/ComparisonSection";
import SolutionsSection from "@/components/SolutionsSection";
import TechStackSection from "@/components/TechStackSection";
import FounderSection from "@/components/FounderSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

// Material Symbols icon font (loaded globally once)
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samartsev AI — Ваш бизнес продаёт, пока вы спите",
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <CalculatorSection />
        <ComparisonSection />
        <SolutionsSection />
        <TechStackSection />
        <FounderSection />
        <FAQSection />
        <CTABanner />
        <QuizSection />
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
