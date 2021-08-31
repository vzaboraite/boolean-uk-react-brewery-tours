import React, { useEffect, useState } from "react";
import FilterSection from "./components/FilterSection";
import Header from "./components/Header";
import ListSection from "./components/ListSection";

export default function App() {
  /* STATE */
  const [selectState, setSelectState] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [cities, setCities] = useState([]);

  console.log("State: ", {
    selectState,
    breweries,
    cities,
  });

  /* API */

  const getBreweriesByState = (selectedState) =>
    fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${selectedState}&per_page=50`
    )
      .then((res) => res.json())
      .then((breweriesData) => {
        // console.log("breweriesData inside selectState fetch: ", breweriesData);
        setBreweries(breweriesData);
      });

  /* City list extracted from breweries state to use in `FilterSection` cities checkboxes */
  useEffect(() => {
    const extractedCities = breweries.map((brewery) => brewery.city);
    const uniqueCities = [...new Set(extractedCities)].sort();
    setCities(uniqueCities);
  }, [breweries]);

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

  /* COMPONENT */
  return (
    <>
      <Header
        selectState={selectState}
        onChange={handleSelectStateInput}
        onSubmit={handleSelectStateSubmit}
      />
      <main>
        <FilterSection cities={cities} />
        <ListSection breweries={breweries} />
      </main>
    </>
  );
}
