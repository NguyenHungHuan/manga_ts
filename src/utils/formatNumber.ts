export const formatNumberSocial = (number: number) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(number)

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
