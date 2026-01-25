
import FeatureSection from "@/components/FeatureSection";
import HeroImageSection from "@/components/HeroImageSection";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* Hero Image Section */}
        <HeroImageSection />
        {/* Feature Section */}
        <FeatureSection />
      </main>
    </div>
  );
}