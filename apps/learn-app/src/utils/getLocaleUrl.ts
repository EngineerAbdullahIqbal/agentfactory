/**
 * Pure function for locale URL computation.
 * Replaces Docusaurus's useAlternatePageUtils which computes
 * a double prefix (/ur/ur/) when building with BASE_URL="/ur/".
 */
export function getLocaleUrl({
  pathname,
  currentLocale,
  targetLocale,
  defaultLocale,
  localeConfigs,
}: {
  pathname: string;
  currentLocale: string;
  targetLocale: string;
  defaultLocale: string;
  localeConfigs: Record<string, { path?: string }>;
}): string {
  const currentPath = localeConfigs[currentLocale]?.path ?? currentLocale;
  const targetPath = localeConfigs[targetLocale]?.path ?? targetLocale;

  let result = pathname;

  // Strip current locale prefix if not default locale
  if (currentLocale !== defaultLocale) {
    const prefix = `/${currentPath}/`;
    if (result.startsWith(prefix)) {
      result = '/' + result.slice(prefix.length);
    } else if (result === `/${currentPath}`) {
      result = '/';
    }
  }

  // Add target locale prefix (with double-prefix guard)
  if (
    targetLocale !== defaultLocale &&
    !result.startsWith(`/${targetPath}/`) &&
    result !== `/${targetPath}`
  ) {
    result = `/${targetPath}${result}`;
  }

  return result;
}
