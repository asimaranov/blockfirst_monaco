export enum SubscriptionType {
  Free,
  Starter,
  Pro,
}

export interface IUser {
  name: string;
  startTimestamp: number;
  createdAt: string;
  subscriptionType: SubscriptionType;
}
