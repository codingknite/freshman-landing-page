'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';

type PricingPlan = {
  id: string;
  title: string;
  price: string;
  period: string;
  popular?: boolean;
};

type Feature = {
  title: string;
  subtitle: string;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'weekly',
    title: 'Weekly Plan',
    price: '$3.99',
    period: 'week',
  },
  {
    id: 'monthly',
    title: 'Monthly Plan',
    price: '$10.99',
    period: 'month',
    popular: true,
  },
];

const FEATURES: Feature[] = [
  {
    title: 'Past Paper Practice',
    subtitle: 'Practice with real exam questions',
  },
  {
    title: 'Flashcards',
    subtitle: 'Master concepts with interactive cards',
  },
  {
    title: 'Personalized Daily Study Plans',
    subtitle: 'Know exactly what to study today',
  },
  {
    title: 'Full Mock Exams',
    subtitle: 'Enter every exam feeling prepared',
  },
  {
    title: 'Unlimited Active Recall Tests',
    subtitle: 'Build confidence through practice',
  },
  {
    title: 'Unlimited Notes & Books',
    subtitle: 'One place for all your materials',
  },
];

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function PricingThree() {
  return (
    <section className='bg-background py-20 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 md:px-6'>
        {/* Section Header */}
        <div className='text-center mb-12 md:mb-16 lg:mb-20'>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            as='p'
            className='text-sm md:text-base text-red-500/80 mb-2 uppercase tracking-wider font-semibold'
          >
            PRICING
          </TextEffect>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            delay={0.2}
            as='h2'
            className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase'
          >
            transparent pricing
          </TextEffect>
        </div>

        {/* Pricing Cards */}
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular
                    ? 'border-2 border-red-500/50 dark:border-red-500/50 shadow-lg'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                    <span className='bg-red-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full'>
                      Popular
                    </span>
                  </div>
                )}
                <CardHeader className='text-center pb-4'>
                  <CardTitle className='text-2xl font-semibold mb-2'>
                    {plan.title}
                  </CardTitle>
                  <div className='flex items-baseline justify-center gap-2'>
                    <span className='text-4xl md:text-5xl font-bold'>
                      {plan.price}
                    </span>
                    <span className='text-muted-foreground text-lg'>
                      /{plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <ul className='space-y-4'>
                    {FEATURES.map((feature, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <div className='mt-0.5 flex-shrink-0'>
                          <Check
                            size={18}
                            className='text-red-500 dark:text-red-400'
                            strokeWidth={3}
                          />
                        </div>
                        <div className='flex-1'>
                          <p className='font-semibold text-sm md:text-base'>
                            {feature.title}
                          </p>
                          <p className='text-muted-foreground text-xs md:text-sm mt-0.5'>
                            {feature.subtitle}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
