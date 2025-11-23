import Friend from "./Friend.jsx";
export default function FriendList({
  friendList,
  handleSelectFriend,
  selectFriend,
}) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
          key={friend.id}
          id={friend.id}
          handleSelectFriend={handleSelectFriend}
          selectFriend={selectFriend}
        />
      ))}
    </ul>
  );
}
