import Item from "./Item";
import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  clearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortItems;
  switch (sortBy) {
    case "description":
      sortItems = items.slice().sort((a, b) => {
        return a.description.localeCompare(b.description);
      });
      break;
    case "packed":
      sortItems = items.slice().sort((a, b) => {
        return Number(b.packed) - Number(a.packed);
      });
      break;
    default:
      sortItems = items;
      break;
  }

  function handleSortBy(e) {
    const sortedBy = e.target.value;
    setSortBy(sortedBy);
  }

  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item
            item={item}
            key={`list-${item.id}`}
            onDeleteItem={onDeleteItem}
            onUpdateItems={onUpdateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={handleSortBy} name="sort-by">
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear the list</button>
      </div>
    </div>
  );
}
