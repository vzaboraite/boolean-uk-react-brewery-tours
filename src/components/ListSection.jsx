import React from "react";
import BreweriesList from "./BreweriesList";
import SearchBreweriesForm from "./SearchBreweriesForm";

function ListSection({ stateName, breweries, search, onSubmit, onChange }) {
  return (
    <>
      <h1>List of Breweries from {stateName}</h1>
      <header className="search-bar">
        <SearchBreweriesForm
          value={search}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </header>
      <article>
        <BreweriesList breweries={breweries} />
      </article>
    </>
  );
}

export default ListSection;
