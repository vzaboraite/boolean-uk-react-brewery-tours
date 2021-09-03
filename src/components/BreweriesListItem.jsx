import React from "react";

function BreweriesListItem({ brewery }) {
  /* Destructuring brewery object to get necessary keys for data rendering */
  const {
    name,
    brewery_type: breweryType,
    street,
    city,
    postal_code: postalCode,
    phone,
    website_url: websiteUrl,
  } = brewery;

  return (
    <li>
      <h2>{name}</h2>
      <div className="type">{breweryType}</div>
      <section className="address">
        <h3>Address:</h3>
        <p>{street ? street : "N/A"}</p>
        <p>
          <strong>
            {city}, {postalCode}
          </strong>
        </p>
      </section>
      <section className="phone">
        <h3>Phone:</h3>
        <p>{phone ? phone : "N/A"}</p>
      </section>
      <section className="booking">
        <button>Book a tour</button>
      </section>
      <section className="link">
        <a href={websiteUrl} target="_blank" rel="noreferrer">
          Visit Website
        </a>
      </section>
      {/* Conditionally rendered BookingForm */}
    </li>
  );
}

export default BreweriesListItem;
