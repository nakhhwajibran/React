export default function Item({ item, onDeleteItem, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.id}
        onChange={() => onUpdateItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
