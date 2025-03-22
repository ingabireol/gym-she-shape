'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Video, Heart, ShoppingBag, FileText } from 'lucide-react';

const features = [
  {
    id: 'personalized',
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: 'Personalized Programs',
    description: 'Customized workout programs designed specifically for women, adapting to your fitness level, goals, and preferences.',
    image: '/images/features/personalized.jpg',
  },
  {
    id: 'community',
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Supportive Community',
    description: 'Join thousands of women on similar journeys, sharing experiences and motivating each other through our inclusive community.',
    image: '/images/features/community.jpg',
  },
  {
    id: 'video',
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Workouts',
    description: 'Access high-quality workout videos with detailed instructions to ensure proper form and maximize results.',
    image: '/images/features/video.jpg',
  },
  {
    id: 'nutrition',
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: 'Nutrition Guidance',
    description: 'Expert nutrition plans and meal suggestions to complement your fitness routine and boost your overall health.',
    image: '/images/features/nutrition.jpg',
  },
  {
    id: 'shop',
    icon: <ShoppingBag className="h-10 w-10 text-primary" />,
    title: 'Fitness Shop',
    description: 'Quality fitness equipment, supplements, and workout gear to enhance your fitness journey from our curated shop.',
    image: '/images/features/shop.jpg',
  },
  {
    id: 'blog',
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Wellness Content',
    description: 'Informative articles, tips, and resources on fitness, nutrition, wellness, and women's health topics.',
    image: '/images/features/blog.jpg',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeatureHighlights() {
  const [activeFeature, setActiveFeature] = useState('personalized');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SheShape</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            SheShape offers a comprehensive fitness experience designed specifically for women,
            with everything you need to achieve your health and wellness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Features illustration */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-xl">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-white/80 mt-2">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-lg bg-accent1/20 -z-10"></div>
            <div className="absolute -top-6 -right-6 h-12 w-12 rounded-lg bg-primary/20 -z-10"></div>
          </div>

          {/* Features list */}
          <div className="order-1 lg:order-2">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-primary/10 border-l-4 border-primary shadow-sm'
                      : 'hover:bg-neutral-50 border-l-4 border-transparent'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}