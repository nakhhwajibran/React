import { useState } from "react";
import "../index.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItems(id) {
    const newItem = items.filter((items) => items.id !== id);
    setItems(newItem);
  }

  function handleToggleItem(id) {
    const item = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(item);
  }

  function clearList() {
    if (items.length === 0) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete all the list"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItems}
        onUpdateItem={handleToggleItem}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
