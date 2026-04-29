import { Suspense } from 'react';
import TestimonialsSection from '@/components/testimonials';
import PricingClient from './pricing-client';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PricingPage(props: Props) {
  const searchParams = await props.searchParams;
  const billingParam =
    typeof searchParams?.billing === 'string' ? searchParams.billing : undefined;

  return (
    <>
      <Suspense>
        <PricingClient billingParam={billingParam} />
      </Suspense>
      <TestimonialsSection />
    </>
  );
}
