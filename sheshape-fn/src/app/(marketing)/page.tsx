import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/marketing/HeroSection';
import { FeaturedPrograms } from '@/components/marketing/FeaturedPrograms';
import { TrainersShowcase } from '@/components/marketing/TrainersShowcase';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { FeatureHighlights } from '@/components/marketing/FeatureHighlights';
import { CTASection } from '@/components/marketing/CTASection';
import { BlogPreview } from '@/components/marketing/BlogPreview';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Highlights */}
      <FeatureHighlights />
      
      {/* Featured Programs */}
      <FeaturedPrograms />
      
      {/* Trainers Showcase */}
      <TrainersShowcase />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Blog Preview */}
      <BlogPreview />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}