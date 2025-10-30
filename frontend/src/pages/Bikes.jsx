import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bikes");
      setBikes(res.data.filter((bike) => bike.available));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bikes/${id}`);
      setBikes(bikes.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = () => {
    if (!selectedBike) return;
    setEditMode(true);
    setEditData({
      name: selectedBike.name,
      price: selectedBike.price,
      remaining: selectedBike.remaining,
      available: selectedBike.available,
      specs: { ...selectedBike.specs },
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in editData.specs) {
      setEditData({
        ...editData,
        specs: { ...editData.specs, [name]: value },
      });
    } else if (type === "checkbox") {
      setEditData({ ...editData, [name]: checked });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editData,
        specs: JSON.stringify(editData.specs),
      };

      const res = await axios.put(
        `http://localhost:5000/api/bikes/${selectedBike._id}`,
        payload
      );

      setBikes(
        bikes.map((b) => (b._id === selectedBike._id ? res.data.bike : b))
      );
      setSelectedBike(res.data.bike);
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading bikes...</p>;
  if (!bikes.length)
    return (
      <p className="text-center mt-20 text-red-500">No bikes found.</p>
    );

  return (
    <div className="bg-gray-900  p-6 sm:p-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl text-white font-bold mb-4 sm:mb-0">
          All Bikes
        </h2>
        <button
          onClick={() => navigate("/add-bike")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
        >
          + Add New Bike
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bikes.map((bike) => (
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
              onClick={() => setSelectedBike(bike)}
              className="mt-2 px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-semibold w-full"
            >
              More Info
            </button>
          </div>
        ))}
      </div>

{/* update bike */}
      {selectedBike && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 sm:p-6"
          onClick={() => {
            setSelectedBike(null);
            setEditMode(false);
          }}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-3xl p-4 sm:p-6 md:p-8 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {!editMode ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  {selectedBike.name}
                </h2>

                {selectedBike.image ? (
                  <img
                    src={`http://localhost:5000${selectedBike.image}`}
                    alt={selectedBike.name}
                    className="w-full h-48 sm:h-60 md:h-64 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-60 md:h-64 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
                    No Image
                  </div>
                )}

                <p className="text-yellow-400 mb-2">
                  Price: {selectedBike.price} $
                </p>
                <p className="text-green-400 mb-2">
                  Remaining: {selectedBike.remaining}
                </p>
                <p className="text-gray-300 mb-2 text-sm sm:text-base">
                  Added on:{" "}
                  {new Date(selectedBike.createdAt).toLocaleDateString()}
                </p>

                <h3 className="text-white font-semibold mt-3 mb-1">Specifications:</h3>
                <ul className="text-gray-300 text-sm sm:text-base mb-4 space-y-1">
                  {Object.entries(selectedBike.specs).map(([key, value]) => (
                    <li key={key}>
                      <b>{key}:</b> {value}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-white font-semibold flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedBike._id)}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedBike(null)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <form
                onSubmit={handleEditSubmit}
                className="space-y-3 overflow-auto max-h-[80vh] p-2"
              >
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  Edit {selectedBike.name}
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
                  {Object.entries(editData.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-gray-300 text-sm mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleEditChange}
                        placeholder={key}
                        className="w-full p-2 rounded bg-gray-700 text-white text-sm sm:text-base"
                      />
                    </div>
                  ))}
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

export default Bikes;