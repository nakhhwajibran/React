import Button from "./Button";
export default function Friend({
  id,
  name,
  image,
  balance,
  handleSelectFriend,
  selectFriend,
}) {
  const isSelected = selectFriend === id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">{`You owe ${name} $${Math.abs(balance)}`}</p>
      )}

      {balance > 0 && <p className="green">{`${name} owe you $${balance}`}</p>}

      {balance === 0 && <p>{`You and ${name} are even`}</p>}

      <Button key={name} onClickFnc={() => handleSelectFriend(id)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}
