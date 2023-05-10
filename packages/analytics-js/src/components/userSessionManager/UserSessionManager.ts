/* eslint-disable class-methods-use-this */
import { state } from '@rudderstack/analytics-js/state';
import { generateUUID } from '@rudderstack/analytics-js/components/utilities/uuId';
import { defaultPluginManager } from '@rudderstack/analytics-js/components/pluginsManager';
import { Nullable } from '@rudderstack/analytics-js/types';
import { defaultSessionInfo } from '@rudderstack/analytics-js/state/slices/session';
import { IStore } from '@rudderstack/analytics-js/services/StoreManager/types';
import { batch, effect } from '@preact/signals-core';
import { AnonymousIdOptions, ApiObject, SessionInfo } from '@rudderstack/analytics-js/state/types';
import { mergeDeepRight } from '@rudderstack/analytics-js/components/utilities/object';
import { IUserSessionManager } from './types';
import { userSessionStorageKeys } from './userSessionStorageKeys';
import { getReferrer } from '../utilities/page';
import { getReferringDomain } from '../utilities/url';
import { isValidTraitsValue } from './utils';

// TODO: the v1.1 user data storage part joined with the auto session features and addCampaignInfo
class UserSessionManager implements IUserSessionManager {
  storage?: IStore;

  constructor(storage?: IStore) {
    this.storage = storage;
  }

  /**
   * Initialize User session with values from storage
   * @param storage Selected storage
   */
  init(storage: IStore) {
    this.storage = storage;

    // get the values from storage and set it again
    this.setUserId(this.getUserId() || '');
    this.setUserTraits(this.getUserTraits() || {});
    this.setGroupId(this.getGroupId() || '');
    this.setGroupTraits(this.getGroupTraits() || {});
    this.setAnonymousId(this.getAnonymousId());

    const initialReferrer = this.getInitialReferrer();
    const initialReferringDomain = this.getInitialReferringDomain();

    if (initialReferrer && initialReferringDomain) {
      this.setInitialReferrer(initialReferrer);
      this.setInitialReferringDomain(initialReferringDomain);
    } else {
      if (initialReferrer) {
        this.setInitialReferrer(initialReferrer);
        this.setInitialReferringDomain(getReferringDomain(initialReferrer));
      }
      const referrer = getReferrer();
      this.setInitialReferrer(referrer);
      this.setInitialReferringDomain(getReferringDomain(referrer));
    }
    // Register the effect to sync with storage
    this.syncSessionWithStorage();
  }

  /**
   * Function to update storage whenever state value changes
   */
  syncSessionWithStorage() {
    /**
     * Update userId in storage automatically when userId is updated in state
     */
    effect(() => {
      if (state.session.userId.value) {
        this.storage?.set(userSessionStorageKeys.userId, state.session.userId.value);
      } else {
        this.storage?.remove(userSessionStorageKeys.userId);
      }
    });
    /**
     * Update user traits in storage automatically when it is updated in state
     */
    effect(() => {
      if (isValidTraitsValue(state.session.userTraits.value)) {
        this.storage?.set(userSessionStorageKeys.userTraits, state.session.userTraits.value);
      } else {
        this.storage?.remove(userSessionStorageKeys.userTraits);
      }
    });
    /**
     * Update group id in storage automatically when it is updated in state
     */
    effect(() => {
      if (state.session.groupId.value) {
        this.storage?.set(userSessionStorageKeys.groupId, state.session.groupId.value);
      } else {
        this.storage?.remove(userSessionStorageKeys.groupId);
      }
    });
    /**
     * Update group traits in storage automatically when it is updated in state
     */
    effect(() => {
      if (isValidTraitsValue(state.session.groupTraits.value)) {
        this.storage?.set(userSessionStorageKeys.groupTraits, state.session.groupTraits.value);
      } else {
        this.storage?.remove(userSessionStorageKeys.groupTraits);
      }
    });
    /**
     * Update anonymous user id in storage automatically when it is updated in state
     */
    effect(() => {
      if (state.session.anonymousUserId.value) {
        this.storage?.set(
          userSessionStorageKeys.anonymousUserId,
          state.session.anonymousUserId.value,
        );
      } else {
        this.storage?.remove(userSessionStorageKeys.anonymousUserId);
      }
    });
    /**
     * Update initial referrer in storage automatically when it is updated in state
     */
    effect(() => {
      if (state.session.initialReferrer.value) {
        this.storage?.set(
          userSessionStorageKeys.initialReferrer,
          state.session.initialReferrer.value,
        );
      } else {
        this.storage?.remove(userSessionStorageKeys.initialReferrer);
      }
    });
    /**
     * Update initial referring domain in storage automatically when it is updated in state
     */
    effect(() => {
      if (state.session.initialReferringDomain.value) {
        this.storage?.set(
          userSessionStorageKeys.initialReferringDomain,
          state.session.initialReferringDomain.value,
        );
      } else {
        this.storage?.remove(userSessionStorageKeys.initialReferringDomain);
      }
    });
  }

  /**
   * Sets anonymous id in the following precedence:
   *
   * 1. anonymousId: Id directly provided to the function.
   * 2. rudderAmpLinkerParam: value generated from linker query parm (rudderstack)
   *    using parseLinker util.
   * 3. generateUUID: A new unique id is generated and assigned.
   */
  setAnonymousId(anonymousId?: string, rudderAmpLinkerParam?: string) {
    let finalAnonymousId: string | undefined | null = anonymousId;
    if (!finalAnonymousId && rudderAmpLinkerParam) {
      const linkerPluginsResult = defaultPluginManager.invoke<Nullable<string>>(
        'userSession.anonymousIdGoogleLinker',
        rudderAmpLinkerParam,
      );
      finalAnonymousId = linkerPluginsResult?.[0];
    }
    state.session.anonymousUserId.value = finalAnonymousId || this.generateAnonymousId();
  }

  /**
   * Generate a new anonymousId
   * @returns string anonymousID
   */
  generateAnonymousId(): string {
    return generateUUID();
  }

  /**
   * Fetches anonymousId
   * @param options option to fetch it from external source
   * @returns anonymousId
   */
  getAnonymousId(options?: AnonymousIdOptions): string {
    // fetch the anonymousUserId from storage
    let persistedAnonymousId = this.storage?.get(userSessionStorageKeys.anonymousUserId);

    if (!persistedAnonymousId && options) {
      // fetch anonymousId from external source
      const autoCapturedAnonymousId = defaultPluginManager.invoke<string | undefined>(
        'storage.getAnonymousId',
        options,
      );
      persistedAnonymousId = autoCapturedAnonymousId?.[0];
    }
    state.session.anonymousUserId.value = persistedAnonymousId || this.generateAnonymousId();
    return state.session.anonymousUserId.value as string;
  }

  // TODO: session tracking
  /**
   * A function to return current session info
   */
  getSessionInfo(): Nullable<SessionInfo> {
    const shouldReturnInfo = Boolean(
      state.session.sessionInfo.value.manualTrack ||
        (state.session.sessionInfo.value.autoTrack &&
          this.isValidSession(state.session.sessionInfo.value.expiresAt)),
    );

    if (shouldReturnInfo) {
      return state.session.sessionInfo.value || null;
    }

    return null;
  }

  // TODO: session tracking
  // TODO: move to utility method
  // eslint-disable-next-line class-methods-use-this
  isValidSession(sessionExpirationTimestamp?: number, timestamp = Date.now()): boolean {
    return Boolean(sessionExpirationTimestamp && timestamp <= sessionExpirationTimestamp);
  }

  /**
   * Fetches User Id
   * @returns
   */
  getUserId(): Nullable<string> {
    return this.storage?.get(userSessionStorageKeys.userId) || null;
  }

  /**
   * Fetches User Traits
   * @returns
   */
  getUserTraits(): Nullable<ApiObject> {
    return this.storage?.get(userSessionStorageKeys.userTraits) || null;
  }

  /**
   * Fetches Group Id
   * @returns
   */
  getGroupId(): Nullable<string> {
    return this.storage?.get(userSessionStorageKeys.groupId) || null;
  }

  /**
   * Fetches Group Traits
   * @returns
   */
  getGroupTraits(): Nullable<ApiObject> {
    return this.storage?.get(userSessionStorageKeys.groupTraits) || null;
  }

  /**
   * Fetches Initial Referrer
   * @returns
   */
  getInitialReferrer(): Nullable<string> {
    return this.storage?.get(userSessionStorageKeys.initialReferrer) || null;
  }

  /**
   * Fetches Initial Referring domain
   * @returns
   */
  getInitialReferringDomain(): Nullable<string> {
    return this.storage?.get(userSessionStorageKeys.initialReferringDomain) || null;
  }

  /**
   * Reset state values
   * @param resetAnonymousId
   * @param noNewSessionStart
   * @returns
   */
  reset(resetAnonymousId?: boolean, noNewSessionStart?: boolean) {
    const { manualTrack, autoTrack } = state.session.sessionInfo.value;

    batch(() => {
      state.session.userId.value = '';
      state.session.userTraits.value = {};
      state.session.groupId.value = '';
      state.session.groupTraits.value = {};

      if (resetAnonymousId) {
        state.session.anonymousUserId.value = '';
      }

      if (noNewSessionStart) {
        return;
      }

      if (autoTrack) {
        state.session.sessionInfo.value = { ...defaultSessionInfo };
        this.startAutoTracking();
      } else if (manualTrack) {
        this.start();
      }
    });
  }

  /**
   * Set user Id
   * @param userId
   */
  setUserId(userId?: Nullable<string>) {
    state.session.userId.value = userId;
  }

  /**
   * Set user traits
   * @param userId
   */
  setUserTraits(traits?: Nullable<ApiObject>) {
    if (traits) {
      state.session.userTraits.value = mergeDeepRight(state.session.userTraits.value || {}, traits);
    }
  }

  /**
   * Set group Id
   * @param userId
   */
  setGroupId(groupId?: Nullable<string>) {
    state.session.groupId.value = groupId;
  }

  /**
   * Set group traits
   * @param userId
   */
  setGroupTraits(traits?: Nullable<ApiObject>) {
    if (traits) {
      state.session.groupTraits.value = mergeDeepRight(
        state.session.groupTraits.value || {},
        traits,
      );
    }
  }

  /**
   * Set initial referrer
   * @param userId
   */
  setInitialReferrer(referrer?: string) {
    state.session.initialReferrer.value = referrer;
  }

  /**
   * Set initial referring domain
   * @param userId
   */
  setInitialReferringDomain(referrer?: string) {
    state.session.initialReferringDomain.value = referrer;
  }

  // TODO: session tracking
  startAutoTracking() {}

  // TODO: session tracking
  start(sessionId?: number) {}

  // TODO: session tracking
  end() {
    this.reset(false, true);
    this.clearUserSessionStorage();
  }

  /**
   * Clear storage
   * @param resetAnonymousId
   */
  clearUserSessionStorage(resetAnonymousId?: boolean) {
    this.storage?.remove(userSessionStorageKeys.userId);
    this.storage?.remove(userSessionStorageKeys.userTraits);
    this.storage?.remove(userSessionStorageKeys.groupId);
    this.storage?.remove(userSessionStorageKeys.groupTraits);

    if (resetAnonymousId) {
      this.storage?.remove(userSessionStorageKeys.anonymousUserId);
    }
  }
}

const defaultUserSessionManager = new UserSessionManager();

export { UserSessionManager, defaultUserSessionManager };