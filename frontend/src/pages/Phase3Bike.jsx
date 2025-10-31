import React, { useEffect, useState } from "react";
import axios from "axios";

const Phase3Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [createMode, setCreateMode] = useState(false);
  const [createData, setCreateData] = useState({
    name: "",
    price: "",
    remaining: "",
    available: true,
    image: null,
  });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/phase3");
      setBikes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/phase3/${id}`);
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
      image: null,
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
        if (value !== null) formData.append(key, value);
      });

      const res = await axios.put(
        `http://localhost:5000/api/phase3/${selectedBike._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setBikes(bikes.map((b) => (b._id === selectedBike._id ? res.data.bikeHire : b)));
      setSelectedBike(res.data.bikeHire);
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

      const res = await axios.post("http://localhost:5000/api/phase3", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBikes([...bikes, res.data.bikeHire]);
      setCreateMode(false);
      setCreateData({
        name: "",
        price: "",
        remaining: "",
        available: true,
        image: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading bikes...</p>;

  if (!bikes.length)
    return <p className="text-center mt-20 text-red-500">No bikes found.</p>;

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl text-white font-bold mb-4 sm:mb-0">Phase 3 Bikes</h2>
        <button
          onClick={() => setCreateMode(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
        >
          + Add New Bike
        </button>
      </div>

      {/* Bike Grid */}
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
            <p className="text-yellow-400 text-center">{bike.price} $</p>
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

      {/* CREATE Modal */}
      {createMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-start items-start z-50 p-4"
          onClick={() => setCreateMode(false)}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-md p-6 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl text-white font-bold mb-4">Add New Bike</h2>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={createData.name}
                onChange={handleCreateChange}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="number"
                name="price"
                value={createData.price}
                onChange={handleCreateChange}
                placeholder="Price"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="number"
                name="remaining"
                value={createData.remaining}
                onChange={handleCreateChange}
                placeholder="Remaining"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <div className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="available"
                  checked={createData.available}
                  onChange={handleCreateChange}
                />
                <label>Available</label>
              </div>

              <input
                type="file"
                name="image"
                onChange={handleCreateChange}
                className="w-full text-white"
              />

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setCreateMode(false)}
                  className="flex-1 px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW / EDIT Modal */}
      {selectedBike && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => {
            setSelectedBike(null);
            setEditMode(false);
          }}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-3xl p-6 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {!editMode ? (
              <>
                <h2 className="text-2xl text-white font-bold mb-4 text-center">
                  {selectedBike.name}
                </h2>

                {selectedBike.image ? (
                  <img
                    src={`http://localhost:5000${selectedBike.image}`}
                    className="w-full h-56 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-gray-400 rounded mb-4">
                    No Image
                  </div>
                )}

                <p className="text-yellow-400 mb-2">Price: {selectedBike.price} $</p>
                <p className="text-green-400 mb-2">
                  Remaining: {selectedBike.remaining}
                </p>

                <p className="text-gray-300 mb-2 text-sm">
                  Added On: {new Date(selectedBike.createdAt).toLocaleDateString()}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="flex-1 px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(selectedBike._id)}
                    className="flex-1 px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setSelectedBike(null)}
                    className="flex-1 px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <h2 className="text-2xl text-white font-bold text-center mb-2">
                  Edit {selectedBike.name}
                </h2>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <input
                  type="number"
                  name="remaining"
                  value={editData.remaining}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <div className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    name="available"
                    checked={editData.available}
                    onChange={handleEditChange}
                  />
                  <label>Available</label>
                </div>

                <input
                  type="file"
                  name="image"
                  onChange={handleEditChange}
                  className="text-white"
                />

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex-1 px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
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

export default Phase3Bikes;
