import React from "react";

function SearchBreweriesForm({ value, onSubmit, onChange }) {
  return (
    <form id="search-breweries-form" autoComplete="off" onSubmit={onSubmit}>
      <label htmlFor="search-breweries">
        <h2>Search breweries:</h2>
      </label>
      <input
        id="search-breweries"
        name="search-breweries"
        type="text"
        onChange={onChange}
        value={value}
      />
    </form>
  );
}

export default SearchBreweriesForm;
