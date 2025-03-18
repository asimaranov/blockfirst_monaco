export function formatPrice(price: number, currency: string = '₽') {
  const formatter = new Intl.NumberFormat('fr-FR');
  return `${currency}${formatter.format(Math.ceil(price))}`;
}
