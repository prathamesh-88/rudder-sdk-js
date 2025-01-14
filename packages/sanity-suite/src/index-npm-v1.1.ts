import * as RudderAnalytics from 'rudder-sdk-js';
import { initSanitySuite } from './testBook';

const getWriteKey = () => {
  switch ('FEATURE' as string) {
    case 'dataResidency':
      return 'FEATURE_DATA_RESIDENCY_WRITE_KEY';
    case 'preloadBuffer':
      return 'FEATURE_PRELOAD_BUFFER_WRITE_KEY';
    case 'eventFiltering':
      return 'FEATURE_EVENT_FILTERING_WRITE_KEY';
    default:
      return 'WRITE_KEY';
  }
};

const getLoadOptions = () => {
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  switch ('FEATURE' as string) {
    case 'dataResidency':
      return {
        logLevel: 'DEBUG',
        configUrl: 'CONFIG_SERVER_HOST',
        lockIntegrationsVersion: true,
        destSDKBaseURL: 'APP_DEST_SDK_BASE_URL',
        cookieConsentManager: {
          oneTrust: {
            enabled: true,
          },
        },
      };
    case 'preloadBuffer':
      return {
        logLevel: 'DEBUG',
        configUrl: 'CONFIG_SERVER_HOST',
        lockIntegrationsVersion: true,
        destSDKBaseURL: 'APP_DEST_SDK_BASE_URL',
        cookieConsentManager: {
          oneTrust: {
            enabled: true,
          },
        },
      };
    // eslint-disable-next-line sonarjs/no-duplicated-branches
    case 'eventFiltering':
      return {
        logLevel: 'DEBUG',
        configUrl: 'CONFIG_SERVER_HOST',
        lockIntegrationsVersion: true,
        destSDKBaseURL: 'APP_DEST_SDK_BASE_URL',
        cookieConsentManager: {
          oneTrust: {
            enabled: true,
          },
        },
      };
    // eslint-disable-next-line sonarjs/no-duplicated-branches
    default:
      return {
        logLevel: 'DEBUG',
        configUrl: 'CONFIG_SERVER_HOST',
        lockIntegrationsVersion: true,
        destSDKBaseURL: 'APP_DEST_SDK_BASE_URL',
        cookieConsentManager: {
          oneTrust: {
            enabled: true,
          },
        },
      };
  }
};

const sanitySuiteApp = () => {
  (RudderAnalytics as any).load(getWriteKey(), 'DATA_PLANE_URL', getLoadOptions());

  (RudderAnalytics as any).ready(() => {
    console.log('We are all set!!!');
    initSanitySuite();
  });

  (window as any).rudderanalytics = RudderAnalytics;
};

sanitySuiteApp();
