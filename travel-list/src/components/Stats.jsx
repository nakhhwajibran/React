export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        <em> Starting adding some items to your packing list 🚀</em>
      </footer>
    );

  const noOfItems = items.length;
  const noOfPackedItems = items.filter((item) => {
    return item.packed === true;
  }).length;
  const percentOfPackeditem = Math.round((noOfPackedItems / noOfItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentOfPackeditem === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${noOfItems} item on your list, and you already packed
          ${noOfPackedItems} (${percentOfPackeditem}%)`}
      </em>
    </footer>
  );
}
