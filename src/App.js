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

  function handleToggleItem(id) {
    setItems(items =>
      items.map(
        item => (item.id === id ? { ...item, packed: !item.packed } : item)
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
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

  function PackingList({ items, onDeleteItem, onToggleItems }) {
    const [sortBy, setSortBy] = React.useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description")
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === "packed")
      sortedItems = items.slice().sort((a, b) => {
        if (a.packed === b.packed) return 0;
        if (a.packed) return 1;
        if (b.packed) return -1;
      });

    return (
      <div className="list">
        <ul>
          {sortedItems.map(item =>
            <Item
              onDeleteItem={onDeleteItem}
              key={item.id}
              item={item}
              onToggleItems={onToggleItems}
            />
          )}
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed</option>
          </select>
        </div>
      </div>
    );
  }

  function Item({ item, onDeleteItem, onToggleItems }) {
    return (
      <div>
        <li key={item.id}>
          <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onToggleItems(item.id)}
            />
            {item.quantity}x {item.description}
          </span>
          <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
      </div>
    );
  }

  function Stats({ items }) {
    if (items.length === 0) {
      return (
        <footer className="stats">
          <em>Start adding items to your packing list 🗺️</em>
        </footer>
      );
    }

    const numItens = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const percentage = numPacked / numItens * 100 || 0;

    return (
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You got everything, ready to go  ✈️!!"
            : ` ✈️🧳You have ${numItens} items on your list, and you already packed ${numPacked} (${percentage}%)`}
        </em>
      </footer>
    );
  }
}
