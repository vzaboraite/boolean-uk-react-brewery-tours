import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
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
