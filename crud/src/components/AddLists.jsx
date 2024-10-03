import { useState,useEffect } from "react";
export function Addlists({ setList, lists, editItem, setEditItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Populate the form when editItem changes
  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setPrice(editItem.price);
    }
  }, [editItem]);

  // Add or Update list items
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    if (editItem) {
      // Update the list with the edited item
      setList(
        lists.map((item) =>
          item.id === editItem.id
            ? { ...item, name: name, price: price }
            : item
        )
      );
      setEditItem(null); // Reset the edit state
    } else {
      // Add a new item
      const newList = {
        id: lists.length + 1,
        name: name,
        price: price,
      };

      setList([...lists, newList]);
    }

    // Clear input fields after submission
    setName("");
    setPrice("");
  };

  return (
    <form className="mb-5 space-y-4" onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <input
          name="price"
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="add bg-blue-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
      >
        {editItem ? "Update" : "Add"}
      </button>
    </form>
  );
}
