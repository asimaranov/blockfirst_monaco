import { PlanType } from '~/server/models/userData';
import { SubscriptionType } from './constants/subsctiptions';

export function formatPrice(price: number, currency: string = '₽') {
  const formatter = new Intl.NumberFormat('ru-RU');
  return `${formatter.format(Math.ceil(price))} ${currency}`;
}

// Format date to relative time
export function formatRelativeTime(
  date: Date,
  postFix: string = 'назад'
): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 24 hours ago
  if (diffMins < 60) {
    return `${diffMins} мин. ${postFix}`;
  } else if (diffHours < 24) {
    return `${diffHours} ч. ${postFix}`;
  } else if (diffDays < 7) {
    // Format as "1д. 6ч. назад"
    const remainingHours = diffHours - diffDays * 24;
    if (remainingHours > 0) {
      return `${diffDays}д. ${remainingHours}ч. ${postFix}`;
    } else {
      return `${diffDays}д. ${postFix}`;
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

export function formatLearningTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} мин.`;
  } else if (minutes < 24 * 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes > 0) {
      return `${hours} ч. ${remainingMinutes} мин.`;
    } else {
      return `${hours} ч.`;
    }
  } else {
    const days = Math.floor(minutes / (24 * 60));
    const remainingHours = Math.floor((minutes % (24 * 60)) / 60);
    if (remainingHours > 0) {
      return `${days}д. ${remainingHours}ч.`;
    } else {
      return `${days}д.`;
    }
  }
}
