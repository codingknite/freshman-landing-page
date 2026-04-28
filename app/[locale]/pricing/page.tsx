import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import TestimonialsSection from '@/components/testimonials';
import FooterSection from '@/components/footer';

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

// Reusing the same web app UI structure, replacing CSS vars with Tailwind classes
function PricingContent({ billingParam }: { billingParam?: string }) {
  // Use simple query params to toggle billing state for the server component
  const billing = billingParam === 'monthly' ? 'monthly' : 'annual';

  return (
    <div className='min-h-screen bg-slate-50'>
      <main className='mx-auto max-w-5xl px-8 pb-24 pt-20 md:pt-32'>
        <div className='mx-auto max-w-[360px] text-center'>
          <h1 className='text-3xl md:text-4xl font-bold leading-tight tracking-tight text-slate-900'>
            Simple, Flexible Pricing
          </h1>
          <p className='mt-4 text-base leading-relaxed text-slate-600'>
            Everything you need to build a focused study system. Pick a plan
            that fits your ambition.
          </p>
        </div>

        <div className='mt-10 flex justify-center'>
          <div className='inline-flex items-center rounded-full bg-white p-1 border border-slate-200 shadow-sm'>
            <Link
              href='?billing=monthly'
              scroll={false}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                billing === 'monthly'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <p className='text-sm font-medium'>Monthly</p>
            </Link>
            <Link
              href='?billing=annual'
              scroll={false}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                billing === 'annual'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <p className='text-sm font-medium'>Annual</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  billing === 'annual'
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                Save 24%
              </span>
            </Link>
          </div>
        </div>

        {/* Plan cards */}
        <div className='mt-16 grid grid-cols-1 items-center gap-6 md:grid-cols-3'>
          {plans.map((plan) => {
            const isFree = plan.id === 'free';
            const price =
              billing === 'annual' && plan.annualMonthlyPrice
                ? plan.annualMonthlyPrice
                : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-200
                  ${plan.isFeatured ? 'md:-translate-y-4 shadow-xl z-10 border-indigo-500/30 ring-1 ring-indigo-500/30' : 'shadow-sm'}
                  bg-white border border-slate-200
                `}
              >
                {/* Most Popular badge */}
                {plan.isFeatured && (
                  <span className='absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white'>
                    Most Popular
                  </span>
                )}

                {/* Plan name + tagline */}
                <div>
                  <h3 className='text-lg font-bold text-slate-900'>
                    {plan.name}
                  </h3>
                  <p className='mt-1 text-sm text-slate-500'>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className='mt-6'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-[40px] font-bold leading-none tracking-tight text-slate-900'>
                      {isFree ? '$0' : `$${price}`}
                    </span>
                    <span className='text-base font-medium text-slate-500'>
                      / month
                    </span>
                  </div>
                  <p className='mt-2 h-4 text-xs font-medium text-slate-400'>
                    {!isFree && billing === 'annual' && plan.annualBilledAs
                      ? `Billed ${plan.annualBilledAs}`
                      : ''}
                  </p>
                </div>

                {/* Divider */}
                <div className='my-6 border-t border-slate-100' />

                {/* Features */}
                <ul className='flex-1 space-y-4 mb-8'>
                  {plan.features.map((feature) => (
                    <li key={feature.label} className='flex items-start gap-3'>
                      <Check
                        size={16}
                        strokeWidth={3}
                        className={`mt-0.5 shrink-0 ${
                          feature.included ? 'text-indigo-500' : 'opacity-0'
                        }`}
                      />
                      <span
                        className={`text-sm leading-snug ${
                          feature.included
                            ? 'text-slate-700 font-medium'
                            : 'text-slate-400 opacity-60'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className='mt-auto'>
                  <Link
                    href='https://app.joinfreshman.com'
                    target='_blank'
                    className={`flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-bold transition-all ${
                      plan.isFeatured
                        ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {isFree ? 'Start Free' : `Get ${plan.name}`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-12 text-center'>
          <p className='text-sm font-medium text-slate-500'>
            Cancel anytime · No hidden fees
          </p>
        </div>
      </main>

      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PricingPage(props: Props) {
  const searchParams = await props.searchParams;
  const billingParam = typeof searchParams?.billing === 'string' ? searchParams.billing : undefined;

  return (
    <Suspense>
      <PricingContent billingParam={billingParam} />
    </Suspense>
  );
}
