import { PlanType } from "~/server/models/userData";
import { SubscriptionType } from "./constants/subsctiptions";

export function formatPrice(price: number, currency: string = '₽') {
  const formatter = new Intl.NumberFormat('ru-RU');
  return `${formatter.format(Math.ceil(price))} ${currency}`;
}

// Format date to relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 24 hours ago
  if (diffMins < 60) {
    return `${diffMins} мин. назад`;
  } else if (diffHours < 24) {
    return `${diffHours} ч. назад`;
  } else if (diffDays < 7) {
    // Format as "1д. 6ч. назад"
    const remainingHours = diffHours - diffDays * 24;
    if (remainingHours > 0) {
      return `${diffDays}д. ${remainingHours}ч. назад`;
    } else {
      return `${diffDays}д. назад`;
    }
  } else {
    // Format as date "05-01-2025"
    return date
      .toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');
  }
}

export const planTypeToSubscriptionType = (plan: PlanType) => {
  switch (plan) {
    case 'free':
      return SubscriptionType.Free;
    case 'starter':
      return SubscriptionType.Starter;
    case 'pro':
      return SubscriptionType.Pro;
    default:
      return SubscriptionType.Free;
  }
};