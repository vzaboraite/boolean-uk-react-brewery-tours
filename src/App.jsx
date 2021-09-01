import React, { useState } from "react";
import FilterSection from "./components/FilterSection";
import Header from "./components/Header";
import ListSection from "./components/ListSection";
import { capitalise } from "./utils/StringUtils";

export default function App() {
  /* STATE */
  const [selectState, setSelectState] = useState("");
  /* This state stores State name that is rendered in ListSection heading */
  const [selectedState, setSelectedState] = useState("");
  const [breweries, setBreweries] = useState([]);
  /* Filter states */
  const [type, setType] = useState("");
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  /* Derived state */
  const cities = getCities(breweries);
  const breweriesToRender = applyUserFilters(breweries);

  /* API */

  const getBreweriesByState = (selectedState) =>
    fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
    )
      .then((res) => res.json())
      .then((breweriesData) => {
        const filteredBreweries = cleanData(breweriesData);
        setBreweries(filteredBreweries);
      });

  /*
       This function modifies the data got from API. It's called in `getBreweriesByState()`
      before adding breweriesData got from the fetch request to breweries state.  
  */
  const cleanData = (breweryList) => {
    const filteredBreweries = breweryList.filter((brewery) => {
      const type = brewery["brewery_type"];

      switch (type) {
        case "micro":
          return true;
        case "regional":
          return true;
        case "brewpub":
          return true;
        default:
          return false;
      }
    });
    return filteredBreweries;
  };

  /* City list extracted from breweries state to use in `FilterSection` cities checkboxes */
  function getCities(breweryList) {
    const extractedCities = breweryList.map((brewery) => brewery.city);
    const uniqueCities = [...new Set(extractedCities)].sort();
    return uniqueCities;
  }

  /*  HANDLER FUNCTIONS */
  /* Header Section */
  const handleSelectStateInput = (event) => {
    setSelectState(event.target.value);
  };

  const handleSelectStateSubmit = (event) => {
    event.preventDefault();
    if (selectState === "") {
      setBreweries([]);
    } else {
      getBreweriesByState(selectState);
    }
    setSelectedState(selectState);
  };

  /* Filter section handlers */
  const handleTypeOptionsChange = (event) => {
    setType(event.target.value);
  };

  const handleCityCheckbox = (event) => {
    const isChecked = event.target.checked;
    const selectedCity = event.target.value;

    if (isChecked) {
      setCity([...city, selectedCity]);
    } else {
      const filteredCities = city.filter((city) => selectedCity !== city);
      setCity(filteredCities);
    }
  };

  /* List Section handlers */
  const handleSearchBreweriesInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchBreweriesSubmit = (event) => {
    event.preventDefault();
  };

  /* Resets type, city and search filter states to initial values */
  const handleClearAllButton = (event) => {
    setType("");
    setCity([]);
    setSearch("");
  };

  /* FILTER FUNCTIONS */

  function applyUserFilters(breweryList) {
    const filteredByType = filterByType(breweryList);
    const filteredByCity = filterByCity(filteredByType);
    const filteredBySearch = filterBySearch(filteredByCity);

    return filteredBySearch;
  }

  function filterByType(berweryList) {
    if (type === "") {
      return berweryList;
    }

    const filteredBreweries = berweryList.filter(
      (brewery) => brewery["brewery_type"] === type
    );

    return filteredBreweries;
  }

  function filterByCity(breweryList) {
    if (city.length === 0) {
      return breweryList;
    }

    const filteredBreweries = breweryList.filter((brewery) =>
      city.includes(brewery.city.toLowerCase())
    );
    return filteredBreweries;
  }

  function filterBySearch(breweryList) {
    if (search === "") {
      return breweryList;
    }

    const filteredBreweries = breweryList.filter((brewery) => {
      return (
        brewery.name.toLowerCase().includes(search) ||
        brewery.city.toLowerCase().includes(search)
      );
    });

    return filteredBreweries;
  }

  /* COMPONENT */
  return (
    <>
      <Header
        selectState={selectState}
        onChange={handleSelectStateInput}
        onSubmit={handleSelectStateSubmit}
      />
      {breweries.length > 0 && (
        <main>
          <FilterSection
            cities={cities}
            type={type}
            cityFilter={city}
            onClick={handleClearAllButton}
            handleTypeOptionsChange={handleTypeOptionsChange}
            handleCityCheckbox={handleCityCheckbox}
          />
          <ListSection
            stateName={capitalise(selectedState)}
            breweries={breweriesToRender}
            search={search}
            onChange={handleSearchBreweriesInput}
            onSubmit={handleSearchBreweriesSubmit}
          />
        </main>
      )}
    </>
  );
}
