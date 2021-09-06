import React, { useState, useEffect } from "react";
import FilterSection from "./components/FilterSection";
import Header from "./components/Header";
import ListSection from "./components/ListSection";
import { capitalise } from "./utils/StringUtils";

export default function App() {
  /* STATE */
  const [selectedState, setSelectedState] = useState("");
  /* This state stores State name that is keeping track of user input */
  const [selectedStateInput, setSelectedStateInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [cities, setCities] = useState([]);
  /* Filter states */
  const [type, setType] = useState("");
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  /* Derived state */
  const breweriesToRender = getBreweriesToRender(breweries);

  /* API */
  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
      )
        .then((res) => res.json())
        .then((breweriesData) => {
          const filteredBreweries = cleanData(breweriesData);
          // set brewery list with these breweries that has either one of these brewery types: micro, regional, brewpub.
          setBreweries(filteredBreweries);
        });
    } else {
      setBreweries([]);
    }
  }, [selectedState]);

  useEffect(() => {
    const citiesData = getCities(breweries);
    setCities(citiesData);
  }, [breweries]);

  /*
       This function modifies the data got from API. It's called in `getBreweriesByState()`
      before adding breweriesData got from the fetch request to breweries state.  
  */
  const cleanData = (breweryList) => {
    const filteredBreweries = breweryList.filter((brewery) => {
      const type = brewery["brewery_type"];
      const types = ["micro", "regional", "brewpub"];
      /* Checking if types array includes one of the brewery types
       and adding brewery object with matching type into filteredBreweries array. */
      return types.includes(type);
    });
    console.log({ filteredBreweries });
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
    console.log("Inside handleSelectStateInput: ", event.target.value);
    setSelectedStateInput(event.target.value);
  };

  const handleSelectStateSubmit = (event) => {
    event.preventDefault();
    /* TODO: Figure out the way that converting input to selectedStateInputClean
wouldn't mess up the US state name in ListSection heading `List of breweries from ${stateName}`
*/
    // this variable stores snake-cased state name, which is used in url
    // const selectedStateInputClean = selectedStateInput
    //   .toLowerCase()
    //   .split(" ")
    //   .join("_");

    // // there can be used url encoding %20, representing space to separate
    // // states' name if it's composed from more than one word
    // const selectedStateInputClean = selectedStateInput
    //   .toLowerCase()
    //   .split(" ")
    //   .join("%20");

    setSelectedState(selectedStateInput);
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

  /* Function generates limited number of breweries to render */

  function getBreweriesToRender(breweryList) {
    const filteredBreweries = applyUserFilters(breweryList);
    if (filteredBreweries.length > 10) {
      return filteredBreweries.slice(0, 10);
    }

    return filteredBreweries;
  }

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
        // selectState={selectedState}
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
