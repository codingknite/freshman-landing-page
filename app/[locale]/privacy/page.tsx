import { Metadata } from 'next';
import PrivacyPolicy from '@/app/privacy/page';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
  };
}

export default PrivacyPolicy;

