import type { Category } from '../types';

const options: Category[] = ['all', 'music', 'sports', 'tech', 'food'];

const CategoryFilter = ({ value, onChange }) => (
  <div className="filters">
    {options.map(option => (
      <button
        key={option}
        type="button"
        className={option === value ? 'filter active' : 'filter'}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
