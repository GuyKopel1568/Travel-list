import React from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "airpods", quantity: 1, packed: true },
  { id: 4, description: "bag", quantity: 1, packed: false },
  { id: 5, description: "shoes", quantity: 1, packed: false },
  { id: 6, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
  const [items, setItems] = React.useState([]);
  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }

  function handleDelete(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDelete} />
      <Stats />
    </div>
  );

  function Logo() {
    return <h1>🗺️🌴Far Away💼🌍</h1>;
  }

  function Form({ onAddItem }) {
    const [description, setDescription] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);

    function handleSubmit(e) {
      e.preventDefault();

      if (!description) return;

      const newItem = { description, quantity, packed: false, id: Date.now() };
      console.log(newItem);

      onAddItem(newItem);

      setQuantity("1");
      setDescription("");
    }

    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?😎</h3>
        <select
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))} //e.target.value will always return a string so we need to convert it to a number
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num =>
            <option value={num} key={num}>
              {num}
            </option>
          )}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    );
  }

  function PackingList({ items, onDeleteItem }) {
    return (
      <ul className="list">
        {items.map(item =>
          <Item onDeleteItem={onDeleteItem} key={item.id} item={item} />
        )}
      </ul>
    );
  }

  function Item({ item, onDeleteItem }) {
    const [isChecked, setIsChecked] = React.useState(item.packed);

    function handleCheckboxChange() {
      setIsChecked(!isChecked);
    }

    return (
      <div>
        <li key={item.id}>
          <span style={isChecked ? { textDecoration: "line-through" } : {}}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {item.quantity}x {item.description}
          </span>
          <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
      </div>
    );
  }

  function Stats() {
    return (
      <footer className="stats">
        <em>
          ✈️🧳You have X items on your list, and you already packed X (X%)
        </em>
      </footer>
    );
  }
}
