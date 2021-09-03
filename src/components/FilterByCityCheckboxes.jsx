import React from "react";

function FilterByCityCheckboxes({ checked, city, lowercasedCity, onChange }) {
  return (
    <>
      <input
        type="checkbox"
        name={lowercasedCity}
        value={lowercasedCity}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={lowercasedCity}>{city}</label>
    </>
  );
}

export default FilterByCityCheckboxes;
