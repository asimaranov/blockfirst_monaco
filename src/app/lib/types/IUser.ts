import { SubscriptionType } from "../constants/subsctiptions";

export interface IUser {
  name: string;
  startTimestamp: number;
  createdAt: string;
  subscriptionType: SubscriptionType;
  tariff: SubscriptionType;
}
