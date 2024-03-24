import React from "react";

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  return (
    <div className="filter-component">
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={onFilter}
      />
      {filterText && (
        <button className="clear-button" onClick={onClear}>
          Limpiar
        </button>
      )}
    </div>
  );
};

export default FilterComponent;