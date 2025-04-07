import freeSubImg from 'public/subscriptions/bage/coin-free.svg';
import starterSubImg from 'public/subscriptions/bage/coin-starter.svg';
import proSubImg from 'public/subscriptions/bage/coin-pro.svg';

export enum SubscriptionType {
  Free = 'Free',
  Starter = 'Starter',
  Pro = 'Pro',
}

export const subscriptionTypeLabels = {
  [SubscriptionType.Free]: 'Free',
  [SubscriptionType.Starter]: 'Starter',
  [SubscriptionType.Pro]: 'Pro',
};

export const subscriptionTypeColors = {
  [SubscriptionType.Free]: 'bg-[#282D33]',
  [SubscriptionType.Starter]: 'bg-[#282D33]',
  [SubscriptionType.Pro]: 'bg-[#282D33]',
};


export const subscriptionTypeIcons = {
  [SubscriptionType.Free]: freeSubImg,
  [SubscriptionType.Starter]: starterSubImg,
  [SubscriptionType.Pro]: proSubImg,
};
