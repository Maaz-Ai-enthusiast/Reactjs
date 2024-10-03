import { Addlists } from "./components/AddLists";
import { useState, useEffect } from "react";

export default function App() {
  // Get list from localStorage or use default list
  const initialList = JSON.parse(localStorage.getItem("lists")) || [
    {
      id: 1,
      name: "Dell Inc",
      price: 1000,
    },
    {
      id: 2,
      name: "Apple Inc",
      price: 2000,
    },
    {
      id: 3,
      name: "HP Inc",
      price: 3000,
    },
    {
      id: 4,
      name: "Lenovo Inc",
      price: 4000,
    },
  ];

  const [lists, setList] = useState(initialList);
  const [editItem, setEditItem] = useState(null); // State to track the item being edited

  // Effect to store lists in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="crud p-10">
      <h1 className="text-3xl font-bold mb-5 text-center">CRUD App</h1>

      {/* Pass setList, lists, editItem, and setEditItem as props to Addlists */}
      <Addlists
        setList={setList}
        lists={lists}
        editItem={editItem}
        setEditItem={setEditItem}
      />

      <table className="min-w-full table-auto bg-gray-100 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Edit</th>
            <th className="p-3 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((item, index) => (
            <tr key={index} className="bg-white border-b border-gray-300">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">${item.price}</td>
              <td className="p-3">
                <button
                  className="edit bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
                  onClick={() => setEditItem(item)} // Set the current item to be edited
                >
                  Edit
                </button>
              </td>
              <td className="p-3">
                <button
                  className="delete bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
                  onClick={() => {
                    setList(lists.filter((i) => i.id !== item.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
