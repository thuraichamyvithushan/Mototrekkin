import React, { useState } from "react";
import axios from "axios";

const AddBikeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    available: false,
    remaining: "",
    specs: {
      mileage: "",
      displacement: "",
      engineType: "",
      cylinders: "",
      maxPower: "",
      maxTorque: "",
      frontBrake: "",
      rearBrake: "",
      fuelCapacity: "",
      bodyType: "",
    },
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.specs) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [name]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("available", formData.available);
      form.append("remaining", formData.remaining);
      form.append("specs", JSON.stringify(formData.specs));
      if (image) form.append("image", image);

      const res = await axios.post("http://localhost:5000/api/bikes", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setFormData({
        name: "",
        price: "",
        available: false,
        remaining: "",
        specs: {
          mileage: "",
          displacement: "",
          engineType: "",
          cylinders: "",
          maxPower: "",
          maxTorque: "",
          frontBrake: "",
          rearBrake: "",
          fuelCapacity: "",
          bodyType: "",
        },
      });
      setImage(null);
    } catch (error) {
      setMessage("Error adding bike: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-3xl bg-gray-800 text-white rounded-lg shadow-lg p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Bike</h2>
        {message && <p className="text-center text-green-400 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium">Available:</label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Remaining:</label>
            <input
              type="number"
              name="remaining"
              value={formData.remaining}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full text-gray-300"
            />
          </div>

          <h3 className="text-xl font-semibold mt-6 border-t border-gray-700 pt-4">
            Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(formData.specs).map((key) => (
              <div key={key}>
                <label className="block mb-1 capitalize text-gray-300">
                  {key.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData.specs[key]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-colors duration-300"
          >
            Add Bike
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBikeForm;
