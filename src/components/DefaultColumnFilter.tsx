// DefaultColumnFilter.tsx
import React from 'react';

export const DefaultColumnFilter: React.FC<any> = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value)}
      placeholder={`Search ${column.Header.toLowerCase()}`}
      className="form-control"
    />
  );
};
