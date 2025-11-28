import { useState } from "react";
import FriendList from "./FriendList.jsx";
import Button from "./Button.jsx";
import FormAddFriend from "./FormAddFriend.jsx";
import FormSplitBill from "./FormSplitBill.jsx";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [isShowAddFriendFrom, setIsShowAddFriendFrom] = useState(false);

  const [selectFriend, setSelectFriend] = useState(null);

  function handleAddFriendForm() {
    setIsShowAddFriendFrom((isShow) => !isShow);
  }

  function handleSelectFriend(id) {
    setSelectFriend((selectFriend) => (selectFriend === id ? null : id));
    setIsShowAddFriendFrom(false);
  }

  function handleAddFriend(newFriend) {
    const newFriendList = [...friendList, newFriend];
    setFriendList(newFriendList);
    setIsShowAddFriendFrom(false);
  }

  function handleSplitBill(friendList) {
    setFriendList(friendList);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          handleSelectFriend={handleSelectFriend}
          friendList={friendList}
          selectFriend={selectFriend}
        />
        {isShowAddFriendFrom && (
          <FormAddFriend handleAddFriend={handleAddFriend} />
        )}
        <Button onClickFnc={handleAddFriendForm}>
          {!isShowAddFriendFrom ? "Add Friend" : "Close"}
        </Button>
      </div>
      {selectFriend && (
        <FormSplitBill
          key={selectFriend}
          friendList={friendList}
          handleSplitBill={handleSplitBill}
          selectFriend={selectFriend}
          handleSelectFriend={handleSelectFriend}
        />
      )}
    </div>
  );
}
