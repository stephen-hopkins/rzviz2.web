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

export type InternalExternal = "Internal" | "External";
export type UserLevel = "Admin" | "Super User" | "User";
export type SubscriptionStatus = "Free" | "Trial" | "Pro";