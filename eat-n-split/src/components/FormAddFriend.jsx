import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);
  }
  return (
    <form onSubmit={handleFormSubmit} className="form-add-friend">
      <label>👬🏻 Friend name</label>
      <input
        type="text"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
      />

      <label>👬🏻 Image Url</label>
      <input
        type="text"
        value={image}
        name="image"
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
