const userSessionStorageKeys = {
  userId: 'rl_user_id',
  userTraits: 'rl_trait',
  anonymousId: 'rl_anonymous_id',
  groupId: 'rl_group_id',
  groupTraits: 'rl_group_trait',
  initialReferrer: 'rl_page_init_referrer',
  initialReferringDomain: 'rl_page_init_referring_domain',
  sessionInfo: 'rl_session',
  authToken: 'rl_auth_token',
};

const defaultUserSessionValues = {
  userId: '',
  userTraits: {},
  anonymousId: '',
  groupId: '',
  groupTraits: {},
  initialReferrer: '',
  initialReferringDomain: '',
  sessionInfo: {},
  authToken: null,
};

const inMemorySessionKeys = {
  session_id: 'sessionId',
};

export { userSessionStorageKeys, inMemorySessionKeys, defaultUserSessionValues };
