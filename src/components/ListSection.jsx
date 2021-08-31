import React from "react";

function ListSection({ breweries, onSubmit, onChange }) {
  // console.log("Inside ListSection: ", breweries);
  return (
    <>
      <h1>List of Breweries from New York</h1>
      <header className="search-bar">
        <form id="search-breweries-form" autoComplete="off" onSubmit={onSubmit}>
          <label htmlFor="search-breweries">
            <h2>Search breweries:</h2>
          </label>
          <input
            id="search-breweries"
            name="search-breweries"
            type="text"
            onChange={onChange}
          />
        </form>
      </header>
      <article>
        <ul className="breweries-list">
          {breweries.map((brewery) => {
            // console.log("Inside breweries map: ", brewery);
            /* Destructuring brewery object to get necessary keys for data rendering */
            const {
              id,
              name,
              brewery_type: breweryType,
              street,
              city,
              postal_code: postalCode,
              phone,
              website_url: websiteUrl,
            } = brewery;

            return (
              <li key={id}>
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
          })}
        </ul>
      </article>
    </>
  );
}

export default ListSection;
