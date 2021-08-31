import React from "react";

function FilterSection(props) {
  const {
    cities,
    handleClearAllButton,
    handleTypeOptionsChange,
    handleCityCheckbox,
    isChecked,
  } = props;

  console.log("Inside FilterSection: ", {
    cities,
    handleClearAllButton,
    handleTypeOptionsChange,
    handleCityCheckbox,
    isChecked,
  });

  /* COMPONENT */
  return (
    <aside className="filters-section">
      <h2>Filter By:</h2>
      <form id="filter-by-type-form" autocompete="off">
        <label htmlFor="filter-by-type">
          <h3>Type of Brewery</h3>
        </label>
        <select
          name="filter-by-type"
          id="filter-by-type"
          onChange={handleTypeOptionsChange}
        >
          <option value="">Select a type...</option>
          <option value="micro">Micro</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
        </select>
      </form>
      <div className="filter-by-city-heading">
        <h3>Cities</h3>
        <button className="clear-all-btn" onClick={handleClearAllButton}>
          clear all
        </button>
      </div>
      <form id="filter-by-city-form">
        {cities.map((city) => {
          // console.log("Inside cities map: ", city);
          const lowercasedCity = city.toLowerCase();
          return (
            // Here using explicit `React.Fragment` in order to be able to use `key` attribute
            /* Resource: https://reactjs.org/docs/fragments.html => `Keyed Fragments` */
            <React.Fragment key={city}>
              <input
                type="checkbox"
                name={lowercasedCity}
                value={lowercasedCity}
                onChange={handleCityCheckbox}
              />
              <label htmlFor={lowercasedCity}>{city}</label>
            </React.Fragment>
          );
        })}
      </form>
    </aside>
  );
}

export default FilterSection;