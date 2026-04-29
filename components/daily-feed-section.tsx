'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/components/i18n-provider';
import { CheckCircle2, Play } from 'lucide-react';

export default function DailyFeedSection() {
  const { messages, t } = useI18n();
  const paragraphs = messages.dailyFeedHighlight.paragraphs;
  const stats = messages.dailyFeedHighlight.stats;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayBtn, setShowPlayBtn] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setShowPlayBtn(true);
        });
      }
    }
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayBtn(false);
    }
  };

  return (
    <section className='bg-[#F8F9FC] py-16 md:py-22'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-16 lg:flex-row lg:gap-24'>
          {/* Left Text */}
          <div className='flex flex-1 flex-col items-start'>
            <h3 className='mb-4 text-xs font-bold uppercase tracking-widest text-[#6366F1] md:text-sm'>
              {t('dailyFeedHighlight.eyebrow')}
            </h3>
            <h2 className='mb-8 text-balance text-4xl font-medium tracking-tight text-[oklch(0.19_0.03_260)] sm:text-5xl lg:text-5xl'>
              {t('dailyFeedHighlight.title')}
            </h2>

            <div className='flex flex-col gap-5 text-base leading-relaxed text-[oklch(0.39_0.02_255)]'>
              {paragraphs.map((para, idx) => {
                const htmlPara = para
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>');
                return (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: htmlPara }} />
                );
              })}
            </div>

            <div className='mt-10 flex w-full flex-col gap-4 border-t border-[oklch(0.91_0.008_260)] pt-10'>
              {stats.map((stat, idx) => (
                <div key={idx} className='flex items-start gap-3'>
                  <CheckCircle2 className='mt-0.5 h-6 w-6 shrink-0 text-[#6366F1]' />
                  <span className='font-medium text-[oklch(0.19_0.03_260)]'>
                    {stat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='relative flex w-full flex-1 justify-center lg:justify-end'>
            <div className='relative w-full max-w-[400px] lg:max-w-[400px]'>
              <div className='relative overflow-hidden'>
                <video
                  ref={videoRef}
                  className='h-auto w-full object-cover'
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload='metadata'
                >
                  <source src='/feed-mockup.mp4' type='video/mp4' />
                  <source src='/feed-mockup.mov' />
                  Your browser does not support the onboarding video.
                </video>

                {showPlayBtn && (
                  <div className='absolute inset-0 z-10 flex items-center justify-center'>
                    <button
                      onClick={handlePlayClick}
                      className='flex h-16 w-16 items-center justify-center rounded-full transition-colors'
                      aria-label='Play video'
                    >
                      <Play
                        className='ml-1 h-8 w-8 text-white'
                        fill='currentColor'
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
