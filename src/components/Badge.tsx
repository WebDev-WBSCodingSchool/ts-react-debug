import type { Category } from '../types';

const colors: Record<Category, string> = {
  music: '#7c3aed',
  sports: '#059669',
  tech: '#2563eb',
  food: '#ea580c'
};

const toLabel = (category: Category): string => category.toUpperCase();

interface BadgeProps {
  category: Category;
}

const Badge = ({ category }: BadgeProps) => (
  <span className="badge" style={{ backgroundColor: colors[category] }}>
    {toLabel(category)}
  </span>
);

export default Badge;
