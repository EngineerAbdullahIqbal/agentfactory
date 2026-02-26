import { describe, it, expect } from 'vitest';
import { getLocaleUrl } from '../utils/getLocaleUrl';

const localeConfigs = {
  en: { path: 'en' },
  ur: { path: 'ur' },
};

const defaults = {
  defaultLocale: 'en',
  localeConfigs,
};

describe('getLocaleUrl', () => {
  it('English → Urdu: adds /ur/ prefix', () => {
    expect(
      getLocaleUrl({
        pathname: '/docs/intro',
        currentLocale: 'en',
        targetLocale: 'ur',
        ...defaults,
      }),
    ).toBe('/ur/docs/intro');
  });

  it('Urdu → English: strips /ur/ prefix', () => {
    expect(
      getLocaleUrl({
        pathname: '/ur/docs/intro',
        currentLocale: 'ur',
        targetLocale: 'en',
        ...defaults,
      }),
    ).toBe('/docs/intro');
  });

  it('English root → Urdu root', () => {
    expect(
      getLocaleUrl({
        pathname: '/',
        currentLocale: 'en',
        targetLocale: 'ur',
        ...defaults,
      }),
    ).toBe('/ur/');
  });

  it('Urdu root → English root', () => {
    expect(
      getLocaleUrl({
        pathname: '/ur',
        currentLocale: 'ur',
        targetLocale: 'en',
        ...defaults,
      }),
    ).toBe('/');
  });

  it('handles path with trailing slash', () => {
    expect(
      getLocaleUrl({
        pathname: '/ur/docs/intro/',
        currentLocale: 'ur',
        targetLocale: 'en',
        ...defaults,
      }),
    ).toBe('/docs/intro/');
  });

  it('double-prefix guard: already /ur/ when switching to Urdu is no-op', () => {
    // If pathname somehow already has /ur/ and we target ur, no double prefix
    expect(
      getLocaleUrl({
        pathname: '/ur/docs/intro',
        currentLocale: 'en',
        targetLocale: 'ur',
        ...defaults,
      }),
    ).toBe('/ur/docs/intro');
  });

  it('same locale is a no-op for default locale', () => {
    expect(
      getLocaleUrl({
        pathname: '/docs/intro',
        currentLocale: 'en',
        targetLocale: 'en',
        ...defaults,
      }),
    ).toBe('/docs/intro');
  });

  it('same locale is a no-op for non-default locale', () => {
    expect(
      getLocaleUrl({
        pathname: '/ur/docs/intro',
        currentLocale: 'ur',
        targetLocale: 'ur',
        ...defaults,
      }),
    ).toBe('/ur/docs/intro');
  });

  it('uses localeConfigs.path when available', () => {
    const customConfigs = {
      en: { path: 'en' },
      ur: { path: 'urdu' },
    };
    expect(
      getLocaleUrl({
        pathname: '/docs/intro',
        currentLocale: 'en',
        targetLocale: 'ur',
        defaultLocale: 'en',
        localeConfigs: customConfigs,
      }),
    ).toBe('/urdu/docs/intro');
  });

  it('falls back to locale name when path not in config', () => {
    expect(
      getLocaleUrl({
        pathname: '/docs/intro',
        currentLocale: 'en',
        targetLocale: 'fr',
        defaultLocale: 'en',
        localeConfigs: { en: { path: 'en' } },
      }),
    ).toBe('/fr/docs/intro');
  });
});
