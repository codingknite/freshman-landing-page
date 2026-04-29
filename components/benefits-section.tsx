'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/components/i18n-provider';

const benefits = [
  {
    id: 'revision',
    title: 'Daily Revision',
    text: 'Freshman generates targeted notes and quick tests for any topic, empowering you to build a daily revision habit that sticks.',
    mockup: '/revision.png',
    icon: '/dr-icon.png',
  },
  {
    id: 'past-papers',
    title: 'Past Paper Practice',
    text: 'Upload your old exams and practice them interactively. Turn static past papers into dynamic, auto-graded MCQ tests.',
    mockup: '/ppp.png',
    icon: '/ppp-icon.png',
  },
  {
    id: 'tests',
    title: 'Comprehensive Testing',
    text: 'Easily generate quizzes, flashcards, and full mock exams to deeply understand your subjects and instantly identify knowledge gaps.',
    mockup: '/tests.png',
    icon: '/testing-icon.png',
  },
  {
    id: 'breakdown',
    title: 'Note Breakdown',
    text: 'Watch your uploaded notes automatically transform into core concepts and targeted revision questions, saving hours of manual synthesis.',
    mockup: '/notes.png',
    icon: '/note-icon.png',
  },
];

const additionalFeatureIcons: Record<string, string> = {
  'active-recall': '/ar-icon.png',
  'daily-habits': '/habits-icon.png',
  'exam-prepared': '/exam-icon.png',
  language: '/language.png',
};

export default function BenefitsSection() {
  const { messages, t } = useI18n();
  const localizedItems = messages.benefits.items;
  const additionalItems = messages.additionalFeatures?.items || [];

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
    <section className='bg-[oklch(0.992_0.004_260/0.96)] py-16 md:py-22 overflow-hidden relative'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='mx-auto mb-16 max-w-3xl text-center md:mb-24 lg:mb-32'>
          <h3 className='mb-4 text-[14px] font-semibold text-[#6366F1] uppercase tracking-wider'>
            {t('benefits.eyebrow')}
          </h3>
          <h2 className='text-balance text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            {t('benefits.title')}
          </h2>
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
          </div>

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

        <div className='lg:hidden flex flex-col gap-10 items-center'>
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
          </div>

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

        <div className='pt-16 md:pt-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-x-16 max-w-5xl mx-auto'>
            {additionalItems.map(
              (
                item: { id: string; title: string; text: string },
                idx: number,
              ) => {
                const iconSrc =
                  additionalFeatureIcons[item.id] || '/dr-icon.png';
                return (
                  <div
                    key={idx}
                    className='flex flex-col items-center text-center'
                  >
                    <div className='mb-4 flex'>
                      <Image
                        src={iconSrc}
                        alt=''
                        width={40}
                        height={40}
                        className='h-10 w-10 object-contain'
                      />
                    </div>
                    <h3 className='text-base md:text-base font-bold text-slate-900 mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-[15px] text-slate-500 leading-relaxed max-w-sm'>
                      {item.text}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type BenefitFeature = {
  id: string;
  icon: string;
  title: string;
  text: string;
  mockup: string;
};

function BenefitCard({
  benefit,
  isActive,
  onClick,
}: {
  benefit: BenefitFeature;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col text-left p-4 md:p-5 rounded-[2rem] transition-all duration-300 ease-out w-full cursor-pointer group ${
        isActive
          ? 'bg-white border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[1.02] z-10'
          : 'bg-transparent border-transparent hover:bg-slate-200/40 opacity-100 hover:opacity-100 z-0'
      }`}
    >
      <div className='mb-5 flex md:mb-6'>
        <Image
          src={benefit.icon}
          alt=''
          width={48}
          height={48}
          className='h-10 w-10 object-contain md:h-12 md:w-12'
        />
      </div>
      <h3
        className={`text-base md:text-lg font-bold mb-2 md:mb-3 transition-colors duration-300 ${
          isActive
            ? 'text-slate-900'
            : 'text-slate-600 group-hover:text-slate-900'
        }`}
      >
        {benefit.title}
      </h3>
      <p
        className={`text-[14px] md:text-[15px] leading-relaxed transition-colors duration-300 ${
          isActive
            ? 'text-slate-600'
            : 'text-slate-500 group-hover:text-slate-600'
        }`}
      >
        {benefit.text}
      </p>
    </button>
  );
}
