import { useRef } from 'react';

const SearchBar = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleChange = e => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search events"
        value={value}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
