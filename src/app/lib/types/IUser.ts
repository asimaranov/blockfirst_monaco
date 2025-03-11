export enum SubscriptionType {
  Free,
  Base,
  Pro,
}

export interface IUser {
  name: string;
  startTimestamp: number;
  createdAt: string;
  subscriptionType: SubscriptionType;
}
