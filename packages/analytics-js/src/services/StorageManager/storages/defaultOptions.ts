import { DEFAULT_COOKIE_MAX_AGE } from '@rudderstack/analytics-js/constants/timeouts';
import { domain } from '@rudderstack/analytics-js/npmPackages/top-domain';
import { ICookieStorageOptions, IInMemoryStorageOptions, ILocalStorageOptions } from '../types';

const getDefaultCookieOptions = (): ICookieStorageOptions => {
  const topDomain = domain(window.location.href);

  return {
    maxage: DEFAULT_COOKIE_MAX_AGE,
    path: '/',
    domain: !topDomain || topDomain === '.' ? undefined : topDomain,
    samesite: 'Lax',
    enabled: true,
  };
};

const getDefaultLocalStorageOptions = (): ILocalStorageOptions => ({
  enabled: true,
});

const getDefaultInMemoryStorageOptions = (): IInMemoryStorageOptions => ({
  enabled: true,
});

export { getDefaultCookieOptions, getDefaultLocalStorageOptions, getDefaultInMemoryStorageOptions };