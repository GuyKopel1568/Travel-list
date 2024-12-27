const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "airpods", quantity: 1, packed: true },
  { id: 4, description: "bag", quantity: 1, packed: false },
  { id: 5, description: "shoes", quantity: 1, packed: false },
  { id: 6, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );

  function Logo() {
    return <h1>🗺️🌴Far Away💼🌍</h1>;
  }

  function Form() {
    function handleSubmit(e) {
      e.preventDefault();
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?😎</h3>
        <select>
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num =>
            <option value={num} key={num}>
              {num}
            </option>
          )}
        </select>
        <input type="text" placeholder="item..." />
        <button>Add</button>
      </form>
    );
  }

  function PackingList() {
    return (
      <ul className="list">
        {initialItems.map(item => <Item item={item} />)}
      </ul>
    );
  }

  function Item({ item }) {
    return (
      <div>
        <li key={item.id}>
          <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            <input type="checkbox" checked={item.packed} />
            {item.quantity}x {item.description}
          </span>
          <button>❌</button>
        </li>
      </div>
    );
  }

  function Stats() {
    return (
      <footer className="stats">
        <em>
          ✈️🧳You have X items on your list, and you alreadyt packed X (X%)
        </em>
      </footer>
    );
  }
}
