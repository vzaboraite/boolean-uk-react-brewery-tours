import React from "react";
import BreweriesListItem from "./BreweriesListItem";

function BreweriesList({ breweries }) {
  return (
    <ul className="breweries-list">
      {breweries.map((brewery) => {
        return <BreweriesListItem key={brewery.id} brewery={brewery} />;
      })}
    </ul>
  );
}

export default BreweriesList;
