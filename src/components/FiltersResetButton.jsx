import React from "react";

function FiltersResetButton({ onClick }) {
  return (
    <button className="clear-all-btn" onClick={onClick}>
      clear all
    </button>
  );
}

export default FiltersResetButton;
