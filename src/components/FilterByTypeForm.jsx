import React from "react";

function FilterByTypeForm({ type, onChange }) {
  return (
    <form id="filter-by-type-form" autocompete="off">
      <label htmlFor="filter-by-type">
        <h3>Type of Brewery</h3>
      </label>
      <select
        name="filter-by-type"
        id="filter-by-type"
        value={type}
        onChange={onChange}
      >
        <option value="">Select a type...</option>
        <option value="micro">Micro</option>
        <option value="regional">Regional</option>
        <option value="brewpub">Brewpub</option>
      </select>
    </form>
  );
}

export default FilterByTypeForm;
