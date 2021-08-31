import React, { useEffect, useState } from "react";
import Header from "./components/Header";

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
        {/* FILTER SECTION */}
        <aside className="filters-section">
          <h2>Filter By:</h2>
          <form id="filter-by-type-form" autocompete="off">
            <label htmlFor="filter-by-type">
              <h3>Type of Brewery</h3>
            </label>
            <select name="filter-by-type" id="filter-by-type">
              <option value="">Select a type...</option>
              <option value="micro">Micro</option>
              <option value="regional">Regional</option>
              <option value="brewpub">Brewpub</option>
            </select>
          </form>
          <div className="filter-by-city-heading">
            <h3>Cities</h3>
            <button className="clear-all-btn">clear all</button>
          </div>
          <form id="filter-by-city-form">
            <input type="checkbox" name="chardon" value="chardon" />
            <label htmlFor="chardon">Chardon</label>
            <input type="checkbox" name="cincinnati" value="cincinnati" />
            <label htmlFor="cincinnati">Cincinnati</label>
            {/* // More checkboxes */}
          </form>
        </aside>
        {/* LIST SECTION */}
        <h1>List of Breweries from New York</h1>
        <header className="search-bar">
          <form id="search-breweries-form" autoComplete="off">
            <label htmlFor="search-breweries">
              <h2>Search breweries:</h2>
            </label>
            <input id="search-breweries" name="search-breweries" type="text" />
          </form>
        </header>
        <article>
          <ul className="breweries-list">
            <li>
              <h2>12 Gates Brewing Company</h2>
              <div className="type">brewpub</div>
              <section className="address">
                <h3>Address:</h3>
                <p>80 Earhart Dr Ste 20</p>
                <p>
                  <strong>Williamsville, 14221-7804</strong>
                </p>
              </section>
              <section className="phone">
                <h3>Phone:</h3>
                <p>7169066600</p>
              </section>
              <section className="booking">
                <button>Book a tour</button>
              </section>
              <section className="link">
                <a
                  href="http://www.12gatesbrewing.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </section>
              {/* Conditionally rendered BookingForm */}
            </li>
            {/* // More list elements */}
          </ul>
        </article>
      </main>
    </>
  );
}
