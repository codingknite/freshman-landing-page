"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { BookOpen, FileText, Brain, Sparkles } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';

const benefits = [
  {
    id: 'revision',
    icon: BookOpen,
    title: 'Daily Revision',
    text: 'Freshman generates targeted notes and quick tests for any topic, empowering you to build a daily revision habit that sticks.',
    mockup: '/revision.png',
  },
  {
    id: 'past-papers',
    icon: FileText,
    title: 'Past Paper Practice',
    text: 'Upload your old exams and practice them interactively. Turn static past papers into dynamic, auto-graded MCQ tests.',
    mockup: '/ppp.png',
  },
  {
    id: 'tests',
    icon: Brain,
    title: 'Comprehensive Testing',
    text: 'Easily generate quizzes, flashcards, and full mock exams to deeply understand your subjects and instantly identify knowledge gaps.',
    mockup: '/tests.png',
  },
  {
    id: 'breakdown',
    icon: Sparkles,
    title: 'Note Breakdown',
    text: 'Watch your uploaded notes automatically transform into core concepts and targeted revision questions, saving hours of manual synthesis.',
    mockup: '/notes.png',
  },
];

export default function BenefitsSection() {
  const { messages, t } = useI18n();
  const localizedItems = messages.benefits.items;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const pauseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isAutoPaused) {
        return;
      }
      setActiveIdx((prevIdx) => (prevIdx + 1) % benefits.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isAutoPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        window.clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const handleBenefitClick = (idx: number) => {
    setActiveIdx(idx);
    setIsAutoPaused(true);

    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsAutoPaused(false);
    }, 3000);
  };

  return (
    <section className='bg-background py-16 md:py-24 overflow-hidden relative'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,250,0.03),transparent_70%)] pointer-events-none' />
      
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16 md:mb-24'>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            as='p'
            className='text-sm md:text-base text-[#6366f1]/80 mb-2 uppercase tracking-wider font-semibold'
          >
            {t('benefits.eyebrow')}
          </TextEffect>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            delay={0.2}
            as='h2'
            className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase tracking-tight text-zinc-900 dark:text-white'
          >
            {t('benefits.title')}
          </TextEffect>
        </div>

        {/* Benefits Grid - Desktop */}
        <div className='hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12 items-center'>
          {/* Left Column */}
          <div className='flex flex-col gap-6'>
            {benefits.slice(0, 2).map((benefit, idx) => (
              <BenefitCard 
                key={benefit.id} 
                benefit={{ ...benefit, ...localizedItems[idx] }} 
                isActive={activeIdx === idx} 
                onClick={() => handleBenefitClick(idx)} 
              />
            ))}
          </div>

          {/* Center Column (Device Mockup) */}
          <div className='flex justify-center relative w-full h-[600px] xl:h-[700px]'>
             {benefits.map((benefit, idx) => (
               <div 
                 key={benefit.id}
                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${activeIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
               >
                 <Image
                    src={benefit.mockup}
                    alt={benefit.title}
                    width={400}
                    height={800}
                    className='w-auto h-full max-h-[95%] object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]'
                    priority={idx === 0}
                  />
               </div>
             ))}
            {/* Ambient Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] -z-10 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-[100px] rounded-full' />
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-6'>
            {benefits.slice(2, 4).map((benefit, idx) => (
              <BenefitCard 
                key={benefit.id} 
                benefit={{ ...benefit, ...localizedItems[idx + 2] }} 
                isActive={activeIdx === idx + 2} 
                onClick={() => handleBenefitClick(idx + 2)} 
              />
            ))}
          </div>
        </div>

        {/* Benefits Layout - Mobile & Tablet */}
        <div className='lg:hidden flex flex-col gap-10 items-center'>
          
          {/* Top Cards (1 & 2) */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
            {benefits.slice(0, 2).map((benefit, idx) => (
              <BenefitCard 
                key={benefit.id} 
                benefit={{ ...benefit, ...localizedItems[idx] }} 
                isActive={activeIdx === idx} 
                onClick={() => handleBenefitClick(idx)} 
              />
            ))}
          </div>

          {/* Center Device Mockup */}
          <div className='flex justify-center relative w-full h-[450px] sm:h-[550px]'>
             {benefits.map((benefit, idx) => (
               <div 
                 key={benefit.id}
                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${activeIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
               >
                 <Image
                    src={benefit.mockup}
                    alt={benefit.title}
                    width={400}
                    height={800}
                    className='w-auto h-full max-h-[90%] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.1)]'
                    priority={idx === 0}
                  />
               </div>
             ))}
            {/* Ambient Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 -z-10 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-[80px] rounded-full' />
          </div>

          {/* Bottom Cards (3 & 4) */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
            {benefits.slice(2, 4).map((benefit, idx) => (
              <BenefitCard 
                key={benefit.id} 
                benefit={{ ...benefit, ...localizedItems[idx + 2] }} 
                isActive={activeIdx === idx + 2} 
                onClick={() => handleBenefitClick(idx + 2)} 
              />
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
}

import { LucideIcon } from 'lucide-react';

type BenefitFeature = {
  id: string;
  icon: LucideIcon; 
  title: string;
  text: string;
  mockup: string;
};

function BenefitCard({ benefit, isActive, onClick }: { benefit: BenefitFeature, isActive: boolean, onClick: () => void }) {
  const Icon = benefit.icon;
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col text-left p-6 md:p-8 rounded-[2rem] transition-all duration-500 ease-out border w-full cursor-pointer group ${
        isActive 
          ? 'bg-white dark:bg-zinc-900/80 border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.04)] scale-[1.02] z-10' 
          : 'bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] opacity-100 hover:opacity-100 z-0'
      }`}
    >
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 ${
        isActive 
          ? 'bg-[#6366f1] text-white shadow-md' 
          : 'bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 group-hover:bg-black/10 dark:group-hover:bg-white/10'
      }`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
      </div>
      <h3 className={`text-lg md:text-xl font-semibold mb-2 md:mb-3 transition-colors duration-500 ${
        isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white'
      }`}>
        {benefit.title}
      </h3>
      <p className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${
        isActive ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400'
      }`}>
        {benefit.text}
      </p>
    </button>
  );
}

