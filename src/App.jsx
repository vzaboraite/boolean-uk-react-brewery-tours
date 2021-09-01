import React, { useEffect, useState } from "react";
import FilterSection from "./components/FilterSection";
import Header from "./components/Header";
import ListSection from "./components/ListSection";

export default function App() {
  /* STATE */
  const [selectState, setSelectState] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [cities, setCities] = useState([]);
  /* Filter states */
  const [type, setType] = useState("");
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  /* Derived state */
  const cities = getCities(breweries);

  console.log("State: ", {
    selectState,
    breweries,
    cities,
    type,
    city,
    search,
  });

  /* API */

  const getBreweriesByState = (selectedState) =>
    fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
    )
      .then((res) => res.json())
      .then((breweriesData) => {
        // console.log("breweriesData inside selectState fetch: ", breweriesData);
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
          break;
        case "regional":
          return true;
          break;
        case "brewpub":
          return true;
          break;
        default:
          return false;
          break;
      }
    });

    console.log("Inside cleanData: ", filteredBreweries);
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
    // console.log("Inside handleSelectStateInput: ", event.target.value);
    setSelectState(event.target.value);
  };

  const handleSelectStateSubmit = (event) => {
    event.preventDefault();
    // console.log("Inside handleSelectStateSubmit: ", event.target);
    getBreweriesByState(selectState);
  };

  /* Filter section handlers */
  const handleTypeOptionsChange = (event) => {
    console.log("Inside handleTypeOptionsFilter: ", event.target.value);
    setType(event.target.value);
  };

  const handleCityCheckbox = (event) => {
    console.log(
      "Inside handleCityCheckbox: ",
      event.target.value,
      event.target.checked
    );
    const isChecked = event.target.checked;
    const selectedCity = event.target.value;

    if (isChecked) {
      setCity([...city, selectedCity]);
    } else {
      const filteredCities = city.filter((city) => selectedCity !== city);
      console.log("filtered cities: ", filteredCities);
      setCity(filteredCities);
    }
  };

  /* List Section handlers */
  const handleSearchBreweriesInput = (event) => {
    console.log("Inside handleSearchBreweriesInput: ", event.target.value);
    setSearch(event.target.value);
  };

  const handleSearchBreweriesSubmit = (event) => {
    event.preventDefault();
    console.log("Inside handleSearchBreweriesSubmit: ", event.target.value);
  };

  /* Resets type and city states to initial values */
  const handleClearAllButton = (event) => {
    console.log("Inside handleClearAllButton: ", event.target);
    setType("");
    setCity([]);
    setSearch("");
  };

  /* Function used to capitalise state name to render at the top of `ListSection` */
  /* Resource: https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/ */
  const capitaliseStateName = (selectedState) => {
    const splittedWords = selectedState.split(" ");
    const capitalisedWords = splittedWords.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalisedStateName = capitalisedWords.join(" ");

    return capitalisedStateName;
  };

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
            handleClearAllButton={handleClearAllButton}
            handleTypeOptionsChange={handleTypeOptionsChange}
            handleCityCheckbox={handleCityCheckbox}
          />
          <ListSection
            stateName={capitaliseStateName(selectState)}
            breweries={breweries}
            onChange={handleSearchBreweriesInput}
            onSubmit={handleSearchBreweriesSubmit}
          />
        </main>
      )}
    </>
  );
}
