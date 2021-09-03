import React from "react";
import FilterByCityCheckboxes from "./FilterByCityCheckboxes";

function FilterByCityForm({ cities, cityFilter, onChange }) {
  return (
    <form id="filter-by-city-form">
      {cities.map((city) => {
        const lowercasedCity = city.toLowerCase();
        return (
          <FilterByCityCheckboxes
            key={city}
            checked={cityFilter.includes(lowercasedCity)}
            city={city}
            lowercasedCity={lowercasedCity}
            onChange={onChange}
          />
        );
      })}
    </form>
  );
}

export default FilterByCityForm;
