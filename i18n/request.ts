import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isLocale } from './routing';

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieValue = store.get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
