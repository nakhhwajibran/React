import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({
  friendList,
  selectFriend,
  handleSplitBill,
  handleSelectFriend,
}) {
  const selectFriendObj = friendList.filter(
    (frnd) => frnd.id === selectFriend
  )[0];

  const [billAmount, setBillAmount] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [whoPaid, setWhoPaid] = useState("user");

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!billAmount || !yourExpense) return;

    const balance =
      whoPaid === "user"
        ? selectFriendObj.balance + billAmount - yourExpense
        : yourExpense + selectFriendObj.balance;
    const frnd = friendList.map((frnd) => {
      return frnd.id === selectFriend ? { ...frnd, balance } : frnd;
    });
    handleSplitBill(frnd);
    handleSelectFriend(selectFriend);
  }
  return (
    <form className="form-split-bill" onSubmit={handleFormSubmit}>
      <h2>Split a bill with {selectFriendObj.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
      />

      <label>🧍 Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billAmount
              ? yourExpense
              : Number(e.target.value)
          )
        }
      />

      <label>👬🏻 {selectFriendObj.name} expense</label>
      <input
        type="text"
        value={billAmount ? billAmount - yourExpense : ""}
        disabled
      />

      <label>🤑 Who is paying the bill?</label>
      <select
        name=""
        value={whoPaid}
        onChange={(e) => setWhoPaid(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectFriendObj.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
