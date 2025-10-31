import React, { useState } from "react";
import axios from "axios";

const CreatePhase3Form = ({ onSuccess, onCancel }) => {
  const [createData, setCreateData] = useState({
    name: "",
    price: "",
    remaining: "",
    available: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setCreateData({ ...createData, [name]: checked });
    } else if (type === "file") {
      setCreateData({ ...createData, image: files[0] });
    } else {
      setCreateData({ ...createData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(createData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post(
        "http://localhost:5000/api/phase3",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Phase 3 bike created successfully!");
      onSuccess && onSuccess(res.data.phase3);

      // Reset
      setCreateData({
        name: "",
        price: "",
        remaining: "",
        available: true,
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create Phase 3 bike.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Add Phase 3 Bike</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="name"
          value={createData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="number"
          name="price"
          value={createData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="number"
          name="remaining"
          value={createData.remaining}
          onChange={handleChange}
          placeholder="Remaining"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <div className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            name="available"
            checked={createData.available}
            onChange={handleChange}
          />
          <label>Available</label>
        </div>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full text-white"
        />

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white flex-1"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white flex-1"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreatePhase3Form;
