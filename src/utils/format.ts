export const formatPrice = price =>
  price === 0 ? 'Free' : `${price.toFixed(2)} €`;

export const formatDate = isoDate => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const truncate = (text, maxLength) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength).trimEnd()}...`;
