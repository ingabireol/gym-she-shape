import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturedPrograms } from "@/components/marketing/FeaturedPrograms";
import { TrainersShowcase } from "@/components/marketing/TrainersShowcase";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { FeatureHighlights } from "@/components/marketing/FeatureHighlights";
import { CTASection } from "@/components/marketing/CTASection";
import { BlogPreview } from "@/components/marketing/BlogPreview";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section with motivational messaging and primary CTA */}
        <HeroSection />
        
        {/* Feature Highlights - what makes SheShape special */}
        <FeatureHighlights />
        
        {/* Featured Workout Programs */}
        <FeaturedPrograms />
        
        {/* Trainers Showcase */}
        <TrainersShowcase />
        
        {/* Testimonials and Success Stories */}
        <TestimonialsSection />
        
        {/* Blog Preview Section */}
        <BlogPreview />
        
        {/* Call-to-Action Section */}
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}