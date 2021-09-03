import React from "react";
import FilterByCityForm from "./FilterByCityForm";
import FiltersResetButton from "./FiltersResetButton";

function FilterByCitySection({ cities, cityFilter, onClick, onChange }) {
  return (
    <>
      <div className="filter-by-city-heading">
        <h3>Cities</h3>
        <FiltersResetButton onClick={onClick} />
      </div>
      <FilterByCityForm
        cities={cities}
        cityFilter={cityFilter}
        onChange={onChange}
      />
    </>
  );
}

export default FilterByCitySection;
