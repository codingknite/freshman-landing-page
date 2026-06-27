import { Suspense } from 'react';
import TestimonialsSection from '@/components/testimonials';
import PricingClient from './pricing-client';

export default function PricingPage() {
  return (
    <>
      <Suspense>
        <PricingClient />
      </Suspense>
      <TestimonialsSection />
    </>
  );
}
