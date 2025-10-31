import React, { useEffect, useState } from "react";
import axios from "axios";

const BikeHires = () => {
  const [bikeHires, setBikeHires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBikeHire, setSelectedBikeHire] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [createMode, setCreateMode] = useState(false);
  const [createData, setCreateData] = useState({
    name: "",
    price: "",
    remaining: "",
    available: true,
    engineType: "",
    fuelCapacity: "",
    weight: "",
    image: null,
  });

  useEffect(() => {
    fetchBikeHires();
  }, []);

  const fetchBikeHires = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bikehires");
      setBikeHires(res.data.filter((b) => b.available));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike hire?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bikehires/${id}`);
      setBikeHires(bikeHires.filter((b) => b._id !== id));
      setSelectedBikeHire(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = () => {
    if (!selectedBikeHire) return;
    setEditMode(true);
    setEditData({
      name: selectedBikeHire.name,
      price: selectedBikeHire.price,
      remaining: selectedBikeHire.remaining,
      available: selectedBikeHire.available,
      engineType: selectedBikeHire.engineType,
      fuelCapacity: selectedBikeHire.fuelCapacity,
      weight: selectedBikeHire.weight,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setEditData({ ...editData, [name]: checked });
    } else if (type === "file") {
      setEditData({ ...editData, image: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await axios.put(
        `http://localhost:5000/api/bikehires/${selectedBikeHire._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setBikeHires(
        bikeHires.map((b) => (b._id === selectedBikeHire._id ? res.data.bikeHire : b))
      );
      setSelectedBikeHire(res.data.bikeHire);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setCreateData({ ...createData, [name]: checked });
    } else if (type === "file") {
      setCreateData({ ...createData, image: files[0] });
    } else {
      setCreateData({ ...createData, [name]: value });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(createData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await axios.post("http://localhost:5000/api/bikehires", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBikeHires([...bikeHires, res.data.bikeHire]);
      setCreateMode(false);
      setCreateData({
        name: "",
        price: "",
        remaining: "",
        available: true,
        engineType: "",
        fuelCapacity: "",
        weight: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading bike hires...</p>;

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl text-white font-bold mb-4 sm:mb-0">
          All Bikes
        </h2>
        <button
          onClick={() => setCreateMode(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
        >
          + Add New Bike
        </button>
      </div>

      {/* No bike hires message */}
      {bikeHires.length === 0 && (
        <p className="text-center mt-10 text-red-500">
          No bikes found. Please add a bike.
        </p>
      )}

      {/* Bike cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bikeHires.map((bike) => (
          <div
            key={bike._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col items-center"
          >
            {bike.image ? (
              <img
                src={`http://localhost:5000${bike.image}`}
                alt={bike.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-32 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-2">
                No Image
              </div>
            )}
            <h3 className="text-white font-semibold text-center">{bike.name}</h3>
            <p className="text-yellow-400 text-center">{bike.price} $/Day</p>
            <p className="text-green-400 text-center">Remaining: {bike.remaining}</p>

            <button
              onClick={() => setSelectedBikeHire(bike)}
              className="mt-2 px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-semibold w-full"
            >
              More Info
            </button>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {createMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-start items-start z-50 p-4 sm:p-6"
          onClick={() => setCreateMode(false)}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-md p-4 sm:p-6 md:p-8 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Add New Bike Hire</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={createData.name}
                onChange={handleCreateChange}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="number"
                name="price"
                value={createData.price}
                onChange={handleCreateChange}
                placeholder="Price"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="number"
                name="remaining"
                value={createData.remaining}
                onChange={handleCreateChange}
                placeholder="Remaining"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <div className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  name="available"
                  checked={createData.available}
                  onChange={handleCreateChange}
                />
                <label>Available</label>
              </div>
              <input
                type="text"
                name="engineType"
                value={createData.engineType}
                onChange={handleCreateChange}
                placeholder="Engine Type"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="fuelCapacity"
                value={createData.fuelCapacity}
                onChange={handleCreateChange}
                placeholder="Fuel Capacity"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="weight"
                value={createData.weight}
                onChange={handleCreateChange}
                placeholder="Weight"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="file"
                name="image"
                onChange={handleCreateChange}
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
                  onClick={() => setCreateMode(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View / Edit Modal */}
      {selectedBikeHire && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 sm:p-6"
          onClick={() => {
            setSelectedBikeHire(null);
            setEditMode(false);
          }}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-3xl p-4 sm:p-6 md:p-8 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {!editMode ? (
              <>
                {/* Bike details */}
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  {selectedBikeHire.name}
                </h2>
                {selectedBikeHire.image ? (
                  <img
                    src={`http://localhost:5000${selectedBikeHire.image}`}
                    alt={selectedBikeHire.name}
                    className="w-full h-48 sm:h-60 md:h-64 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-60 md:h-64 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
                    No Image
                  </div>
                )}
                <p className="text-yellow-400 mb-2">
                  Price: {selectedBikeHire.price} $
                </p>
                <p className="text-green-400 mb-2">
                  Remaining: {selectedBikeHire.remaining}
                </p>
                <p className="text-gray-300 mb-2 text-sm sm:text-base">
                  Added on: {new Date(selectedBikeHire.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-white font-semibold mt-3 mb-1">Specifications:</h3>
                <ul className="text-gray-300 text-sm sm:text-base mb-4 space-y-1">
                  <li><b>Engine Type:</b> {selectedBikeHire.engineType}</li>
                  <li><b>Fuel Capacity:</b> {selectedBikeHire.fuelCapacity}</li>
                  <li><b>Weight:</b> {selectedBikeHire.weight}</li>
                </ul>
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-white font-semibold flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedBikeHire._id)}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedBikeHire(null)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              // Edit form
              <form
                onSubmit={handleEditSubmit}
                className="space-y-3 overflow-auto max-h-[80vh] p-2"
              >
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  Edit {selectedBikeHire.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="number"
                    name="remaining"
                    value={editData.remaining}
                    onChange={handleEditChange}
                    placeholder="Remaining"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    required
                  />
                  <div className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      name="available"
                      checked={editData.available}
                      onChange={handleEditChange}
                    />
                    <label>Available</label>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-2 mb-1">Specifications:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="engineType"
                    value={editData.engineType}
                    onChange={handleEditChange}
                    placeholder="Engine Type"
                    className="w-full p-2 rounded bg-gray-700 text-white text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    name="fuelCapacity"
                    value={editData.fuelCapacity}
                    onChange={handleEditChange}
                    placeholder="Fuel Capacity"
                    className="w-full p-2 rounded bg-gray-700 text-white text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    name="weight"
                    value={editData.weight}
                    onChange={handleEditChange}
                    placeholder="Weight"
                    className="w-full p-2 rounded bg-gray-700 text-white text-sm sm:text-base"
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={handleEditChange}
                    className="w-full text-white"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white font-semibold flex-1"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeHires;
