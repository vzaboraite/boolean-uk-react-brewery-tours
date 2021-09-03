import React from "react";
import FilterByTypeForm from "./FilterByTypeForm";
import FilterByCitySection from "./FilterByCitySection";

function FilterSection(props) {
  const {
    cities,
    type,
    cityFilter,
    onClick,
    handleTypeOptionsChange,
    handleCityCheckbox,
  } = props;

  /* COMPONENT */
  return (
    <aside className="filters-section">
      <h2>Filter By:</h2>
      <FilterByTypeForm type={type} onChange={handleTypeOptionsChange} />
      <FilterByCitySection
        cities={cities}
        cityFilter={cityFilter}
        onClick={onClick}
        onChange={handleCityCheckbox}
      />
    </aside>
  );
}

export default FilterSection;
