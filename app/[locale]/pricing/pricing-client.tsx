'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { HeroHeader } from '@/components/header';

type BillingCycle = 'monthly' | 'annual';
type PlanTier = 'free' | 'premium' | 'plus';

type PlanFeature = { label: string; included: boolean };

type Plan = {
  id: PlanTier;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualMonthlyPrice: number | null;
  annualBilledAs: string | null;
  features: PlanFeature[];
  isFeatured?: boolean;
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start exploring, no commitment',
    monthlyPrice: null,
    annualMonthlyPrice: null,
    annualBilledAs: null,
    features: [
      { label: '3 document uploads / month', included: true },
      { label: '3 URL notes / month', included: true },
      { label: '2 voice sessions / month', included: true },
      { label: '15 highlights / month', included: true },
      { label: 'Community support', included: true },
      { label: 'Early feature access', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Everything you need to excel',
    monthlyPrice: 10.99,
    annualMonthlyPrice: 8.33,
    annualBilledAs: '$99.99 / year',
    isFeatured: true,
    features: [
      { label: '50 document uploads / month', included: true },
      { label: '50 URL notes / month', included: true },
      { label: '80 voice sessions / month', included: true },
      { label: '1,000 highlights / month', included: true },
      { label: 'Email support', included: true },
      { label: 'Early feature access', included: false },
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    tagline: 'For the most ambitious learners',
    monthlyPrice: 19.99,
    annualMonthlyPrice: 15.99,
    annualBilledAs: '$191.88 / year',
    features: [
      { label: 'Unlimited document uploads', included: true },
      { label: 'Unlimited URL notes', included: true },
      { label: 'Unlimited voice sessions', included: true },
      { label: 'Unlimited highlights', included: true },
      { label: 'Priority support', included: true },
      { label: 'Early feature access', included: true },
    ],
  },
];

type PricingClientProps = {
  billingParam?: string;
};

export default function PricingClient({ billingParam }: PricingClientProps) {
  const [billing, setBilling] = useState<BillingCycle>(
    billingParam === 'monthly' ? 'monthly' : 'annual',
  );
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('premium');

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

        <div className='mt-7 flex justify-center'>
          <div className='inline-flex items-center rounded-full bg-white/70 p-1'>
            <button
              type='button'
              onClick={() => setBilling('monthly')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                billing === 'monthly'
                  ? 'bg-[#0a0b14] text-white shadow-sm'
                  : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
              }`}
            >
              <p className='text-14 font-medium'>Monthly</p>
            </button>
            <button
              type='button'
              onClick={() => setBilling('annual')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                billing === 'annual'
                  ? 'bg-[#0a0b14] text-white shadow-sm'
                  : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
              }`}
            >
              <p className='text-14 font-medium'>Annual</p>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  billing === 'annual'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#eef0fb] text-[#313b73]'
                }`}
              >
                Save 24%
              </span>
            </button>
          </div>
        </div>

        <div className='mt-14 grid grid-cols-1 items-center gap-5 md:grid-cols-3'>
          {plans.map((plan) => {
            const isFree = plan.id === 'free';
            const isSelected = selectedPlan === plan.id;
            const price =
              billing === 'annual' && plan.annualMonthlyPrice
                ? plan.annualMonthlyPrice
                : plan.monthlyPrice;

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
                {plan.isFeatured && (
                  <span className='absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0a0b14] px-3 py-1 text-[11px] font-semibold text-white'>
                    Most Popular
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
                      {isFree ? '$0' : `$${price}`}
                    </span>
                    <span className='text-sm text-[var(--color-text-dim)]'>
                      / month
                    </span>
                  </div>
                  <p className='mt-1 h-4 text-xs text-[var(--color-text-dim)]'>
                    {!isFree && billing === 'annual' && plan.annualBilledAs
                      ? `Billed ${plan.annualBilledAs}`
                      : ''}
                  </p>
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
            {selectedPlan === 'free'
              ? 'No credit card required · Upgrade anytime'
              : 'Cancel anytime · No hidden fees'}
          </p>
        </div>
      </main>
    </div>
  );
}
