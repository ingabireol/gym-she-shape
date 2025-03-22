'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-neutral-50">
      {/* Background circle decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full -z-10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent1/5 rounded-full -z-10 blur-3xl" />
      
      <div className="container-custom relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="tracking-tight mb-6">
              <span className="block text-primary">Empowering Women</span>
              <span className="block">Through Fitness & Wellness</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Join our supportive community and transform your life with expert-designed
              workout programs, personalized nutrition plans, and wellness resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base">
                <Link href="/programs">
                  Explore Programs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/register">
                  Join Now
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image 
                      src={`/images/avatars/user-${i}.jpg`} 
                      alt="User avatar" 
                      width={32} 
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-600">
                <span className="font-semibold">5,000+</span> women have already joined
              </p>
            </div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Woman exercising"
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Weekly Growth</p>
                  <p className="text-xl font-semibold text-neutral-900">+28%</p>
                </div>
              </div>
            </motion.div>
            
            {/* Floating programs card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-accent1/10 rounded-full flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-accent1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Programs</p>
                  <p className="text-xl font-semibold text-neutral-900">50+</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}