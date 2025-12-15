import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { CompaniesSection } from "@/components/CompaniesSection";
import { GallerySection } from "@/components/GallerySection";
import { JournalSection } from "@/components/JournalSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneyTimeline />
      <CompaniesSection />
      <GallerySection />
      <JournalSection />
      <CertificatesSection />
      <Footer />
    </main>
  );
};

export default Index;
