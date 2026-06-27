'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { HeroHeader } from '@/components/header';

type PlanTier = 'weekly' | 'monthly' | 'yearly';

type PlanFeature = { label: string; included: boolean };

type Plan = {
  id: PlanTier;
  name: string;
  tagline: string;
  price: number;
  period: string;
  features: PlanFeature[];
  isFeatured?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    tagline: 'Perfect for exam season cramming',
    price: 3.99,
    period: 'week',
    features: [
      { label: 'Unlimited practice tests', included: true },
      { label: 'Upload past papers', included: true },
      { label: 'Daily revision feed', included: true },
      { label: 'Custom flashcards', included: true },
      { label: 'Unlimited note conversions', included: true },
      { label: 'Cancel anytime', included: true },
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    tagline: 'Ideal for full semester prep',
    price: 10.99,
    period: 'month',
    isFeatured: true,
    badge: 'Most Popular',
    features: [
      { label: 'Unlimited practice tests', included: true },
      { label: 'Upload past papers', included: true },
      { label: 'Daily revision feed', included: true },
      { label: 'Custom flashcards', included: true },
      { label: 'Unlimited note conversions', included: true },
      { label: 'Cancel anytime', included: true },
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    tagline: 'Best value for long-term learners',
    price: 99.99,
    period: 'year',
    badge: '2 Months Free',
    features: [
      { label: 'Unlimited practice tests', included: true },
      { label: 'Upload past papers', included: true },
      { label: 'Daily revision feed', included: true },
      { label: 'Custom flashcards', included: true },
      { label: 'Unlimited note conversions', included: true },
      { label: 'Cancel anytime', included: true },
    ],
  },
];

type PricingClientProps = {
  billingParam?: string;
};

export default function PricingClient({ billingParam }: PricingClientProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('monthly');

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundImage: "url('/bkg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <HeroHeader />

      <main className='mx-auto max-w-5xl px-8 pb-20 pt-28'>
        <div className='mx-auto max-w-[360px] text-center'>
          <h1 className='text-[28px] font-semibold leading-tight tracking-tight text-[var(--color-text)]'>
            Simple, Flexible Pricing
          </h1>
          <p className='mt-2.5 text-sm leading-relaxed text-[var(--color-text-dim)]'>
            Everything you need to build a focused study system. Pick a plan
            that fits your ambition.
          </p>
        </div>

        <div className='mt-14 grid grid-cols-1 items-center gap-5 md:grid-cols-3'>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                role='button'
                tabIndex={0}
                onClick={() => setSelectedPlan(plan.id)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPlan(plan.id)}
                className={`relative flex cursor-pointer select-none flex-col rounded-2xl p-7 outline-none transition-all duration-200
                  ${plan.isFeatured ? 'md:scale-105' : ''}
                  ${
                    isSelected
                      ? 'border border-transparent bg-white shadow-md'
                      : 'border border-[var(--color-border)] bg-white/50 hover:bg-white/60'
                  }`}
              >
                {plan.badge && (
                  <span className='absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0a0b14] px-3 py-1 text-[11px] font-semibold text-white'>
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className='text-[15px] font-semibold text-[var(--color-text)]'>
                    {plan.name}
                  </h3>
                  <p className='mt-0.5 text-xs text-[var(--color-text-dim)]'>
                    {plan.tagline}
                  </p>
                </div>

                <div className='mt-6'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-[36px] font-bold leading-none tracking-tight text-[var(--color-text)]'>
                      ${plan.price}
                    </span>
                    <span className='text-sm text-[var(--color-text-dim)]'>
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <div className='my-5 border-t border-[var(--color-border)]' />

                <ul className='flex-1 space-y-3'>
                  {plan.features.map((feature) => (
                    <li key={feature.label} className='flex items-center gap-3'>
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className={`shrink-0 transition ${
                          feature.included ? 'text-[#313b73]' : 'opacity-0'
                        }`}
                      />
                      <span
                        className={`text-sm leading-snug ${
                          feature.included
                            ? 'text-[var(--color-text)]'
                            : 'text-[var(--color-text-dim)] opacity-40'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className='mt-10 flex flex-col items-center gap-2.5'>
          <p className='text-xs font-medium text-[var(--color-text-dim)]'>
            Cancel anytime · No hidden fees
          </p>
        </div>
      </main>
    </div>
  );
}
