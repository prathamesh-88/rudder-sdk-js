/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { ApplicationState } from '@rudderstack/analytics-js-common/types/ApplicationState';
import { DestinationConfig } from '@rudderstack/analytics-js-common/types/Destination';
import { ILogger } from '@rudderstack/analytics-js-common/types/Logger';
import { ExtensionPlugin } from '@rudderstack/analytics-js-common/types/PluginEngine';
import { IStoreManager } from '@rudderstack/analytics-js-common/types/Store';
import { OneTrustCookieCategory } from '@rudderstack/analytics-js-common/types/Consent';
import { IErrorHandler } from '@rudderstack/analytics-js-common/types/ErrorHandler';
import { PluginName } from '@rudderstack/analytics-js-common/types/PluginsManager';
import { DESTINATION_CONSENT_STATUS_ERROR, ONETRUST_ACCESS_ERROR } from './logMessages';
import { ONETRUST_CONSENT_MANAGER_PLUGIN } from './constants';
import { OneTrustGroup } from './types';

const pluginName: PluginName = 'OneTrustConsentManager';

const OneTrustConsentManager = (): ExtensionPlugin => ({
  name: pluginName,
  deps: [],
  initialize: (state: ApplicationState) => {
    state.plugins.loadedPlugins.value = [...state.plugins.loadedPlugins.value, pluginName];
  },
  consentManager: {
    init(state: ApplicationState, logger?: ILogger): void {
      // Nothing to initialize
    },

    updateConsentsInfo(
      state: ApplicationState,
      storeManager?: IStoreManager,
      logger?: ILogger,
    ): void {
      if (!(globalThis as any).OneTrust || !(globalThis as any).OnetrustActiveGroups) {
        logger?.error(ONETRUST_ACCESS_ERROR(ONETRUST_CONSENT_MANAGER_PLUGIN));
        state.consents.initialized.value = false;
        return;
      }

      // OneTrustConsentManager SDK populates a data layer object OnetrustActiveGroups with
      // the cookie categories Ids that the user has consented to.
      // Eg: ',C0001,C0003,'
      // We split it and save it as an array.
      const allowedConsentIds = (globalThis as any).OnetrustActiveGroups.split(',').filter(
        (n: string) => n,
      );
      const allowedConsents: Record<string, string> = {};
      const deniedConsentIds: string[] = [];

      // Get the groups(cookie categorization), user has created in one trust account.
      const oneTrustAllGroupsInfo: OneTrustGroup[] = (globalThis as any).OneTrust.GetDomainData()
        .Groups;

      oneTrustAllGroupsInfo.forEach((group: OneTrustGroup) => {
        const { CustomGroupId, GroupName } = group;
        if (allowedConsentIds.includes(CustomGroupId)) {
          allowedConsents[CustomGroupId] = GroupName;
        } else {
          deniedConsentIds.push(CustomGroupId);
        }
      });

      state.consents.initialized.value = true;
      state.consents.data.value = { allowedConsentIds: allowedConsents, deniedConsentIds };
    },

    isDestinationConsented(
      state: ApplicationState,
      destConfig: DestinationConfig,
      errorHandler?: IErrorHandler,
      logger?: ILogger,
    ): boolean {
      if (!state.consents.initialized.value) {
        return true;
      }
      const allowedConsentIds = state.consents.data.value.allowedConsentIds as Record<
        string,
        string
      >;

      try {
        // mapping of the destination with the consent group name
        const { oneTrustCookieCategories } = destConfig;

        // If the destination do not have this mapping events will be sent.
        if (!oneTrustCookieCategories) {
          return true;
        }

        // Change the structure of oneTrustConsentGroup as an array and filter values if empty string
        // Eg:
        // ["Performance Cookies", "Functional Cookies"]
        const validOneTrustCookieCategories = oneTrustCookieCategories
          .map((c: OneTrustCookieCategory) => c.oneTrustCookieCategory)
          .filter((n: string | undefined) => n);

        let containsAllConsent = true;
        // Check if all the destination's mapped cookie categories are consented by the user in the browser.
        containsAllConsent = validOneTrustCookieCategories.every(
          (element: string) =>
            Object.keys(allowedConsentIds).includes(element.trim()) ||
            Object.values(allowedConsentIds).includes(element.trim()),
        );

        return containsAllConsent;
      } catch (err) {
        errorHandler?.onError(
          err,
          ONETRUST_CONSENT_MANAGER_PLUGIN,
          DESTINATION_CONSENT_STATUS_ERROR,
        );
        return true;
      }
    },
  },
});

export { OneTrustConsentManager };

export default OneTrustConsentManager;
