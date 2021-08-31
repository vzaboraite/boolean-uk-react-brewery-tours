export default function Header({ selectState, onChange, onSubmit }) {
  return (
    <header className="main-header">
      <section className="select-state-section">
        <h2>Welcome to Brewery Tours</h2>
        <form id="select-state-form" autoComplete="off" onSubmit={onSubmit}>
          <label htmlFor="select-state">Which state are you visiting?</label>
          <input
            id="select-state"
            name="select-state"
            type="text"
            value={selectState}
            onChange={onChange}
          />
        </form>
      </section>
    </header>
  );
}
