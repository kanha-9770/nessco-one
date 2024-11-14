declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  // global.d.ts
import { usePathname } from 'next/navigation';

export function useCountryAndLanguage() {
  const pathname = usePathname();
  const pathSegments = pathname?.split('/') || [];

  // Assuming URL structure like /<countryCode>/<languageCode>
  const countryCode = pathSegments[pathSegments.length - 2] || '';
  const languageCode = pathSegments[pathSegments.length - 1] || '';

  return { countryCode, languageCode };
}
