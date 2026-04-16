import { Metadata } from 'next';
import TermsOfUse from '@/app/terms/page';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
  };
}

export default TermsOfUse;

