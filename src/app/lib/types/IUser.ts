export enum SubscriptionType {
  Free,
  Premium,
}

export interface IUser {
  name: string;
  startTimestamp: number;
  createdAt: string;
  subscriptionType: SubscriptionType;
}
