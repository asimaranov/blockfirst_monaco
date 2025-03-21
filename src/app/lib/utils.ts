export function formatPrice(price: number, currency: string = '₽') {
  const formatter = new Intl.NumberFormat('ru-RU');
  return `${currency}${formatter.format(Math.ceil(price))}`;
}
