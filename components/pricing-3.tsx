'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    description: 'Perfect for cramming sessions',
    price: '$3.99',
    period: '/week',
    features: [
      'All features included',
      'Cancel anytime',
      'No long-term commitment',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Flexible month-to-month billing',
    price: '$10.99',
    period: '/month',
    features: [
      'All features included',
      'Cancel anytime',
      'No long-term commitment',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    description: 'Save 35% with annual billing',
    price: '$99.99',
    period: '/year',
    features: [
      'All features included',
      '3 months free',
      'Cancel anytime',
    ],
    highlighted: true,
  },
];

export default function PricingThree() {
  return (
    <section className="bg-background py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            One Plan, Simple Pricing
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl">
            Everything you need to build powerful study habits. Choose your billing cycle.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`
                rounded-2xl p-8 flex flex-col transition-all duration-300
                ${plan.highlighted 
                  ? 'bg-zinc-50 dark:bg-zinc-900 border-2 border-[#6366f1]/40 relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none scale-100 md:scale-105 z-10' 
                  : 'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm'
                }
              `}
            >
              <div className="mb-8">
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex flex-wrap items-baseline">
                <span className="text-5xl font-medium text-zinc-900 dark:text-white tracking-tight">
                  {plan.price}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 ml-2 font-medium">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-zinc-600 dark:text-zinc-300 text-sm">
                    <Check className="w-4 h-4 mr-3 text-[#6366f1] flex-shrink-0" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mt-12 mb-20">
          Cancel at any time.
        </p>

      </div>
    </section>
  );
}
