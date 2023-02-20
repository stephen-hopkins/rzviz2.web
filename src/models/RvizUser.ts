type RvizUserFields = {
  displayName: string;
  givenName: string;
  surname: string;
  email: string;
  jobTitle: string;
  internalExternal: InternalExternal;
  level: UserLevel;
  subscriptionStatus: SubscriptionStatus;
};

export type NewRvizUser = RvizUserFields & {
  password: string;
};

export type RvizUser = RvizUserFields & {
  id: string;
};

export const internalExternalValues = ["Internal", "External"] as const;
export type InternalExternal = typeof internalExternalValues[number];

export const userLevelValues = ["Admin", "Super User", "User"] as const;
export type UserLevel = typeof userLevelValues[number];

export const subscriptionStatusValues = ["Free", "Trial", "Pro"]
export type SubscriptionStatus = typeof subscriptionStatusValues[number];