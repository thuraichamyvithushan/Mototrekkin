import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig"; // Use the configured axios instance
import { format } from "date-fns";

const AdminBikeHire = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all bike rental bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/bikeBookings"); // Interceptor adds token
      console.log("AdminBikeHire: Bookings fetched", { count: res.data.length });
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("AdminBikeHire: Error fetching bookings", error);
      const message =
        error.response?.status === 401
          ? "Please log in as admin to view bike hire bookings"
          : error.response?.data?.message || "Failed to fetch bike hire bookings";
      setError(message);
      setLoading(false);
    }
  };

  // Delete a booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike hire booking?")) return;
    try {
      await axios.delete(`/api/bikeBookings/${id}`); // Interceptor adds token
      console.log("AdminBikeHire: Booking deleted", { id });
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Bike hire booking deleted successfully");
    } catch (error) {
      console.error("AdminBikeHire: Error deleting booking", error);
      const message =
        error.response?.status === 401
          ? "Please log in as admin to delete bike hire bookings"
          : error.response?.data?.message || "Failed to delete bike hire booking";
      alert(message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-black p-4">Loading bike hire bookings...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error}</p>
        {error.includes("log in") && (
          <button
            onClick={() => (window.location.href = "/?openAuthModal=true")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log In
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 w-full h-full text-black">
      <h1 className="text-2xl font-bold mb-4">All Bike Hire Bookings</h1>

      <div className="max-w-6xl mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[80vh]">
        <table className="w-max min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border-b">Booking ID</th>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Mobile</th>
              <th className="px-4 py-2 border-b">Bike Model</th>
              <th className="px-4 py-2 border-b">Pickup Date</th>
              <th className="px-4 py-2 border-b">Return Date</th>
              <th className="px-4 py-2 border-b">Total Days</th>
              <th className="px-4 py-2 border-b">Payment Status</th>
              <th className="px-4 py-2 border-b">Licence Number</th>
              <th className="px-4 py-2 border-b">Licence Expiry</th>
              <th className="px-4 py-2 border-b">Licence State</th>
              <th className="px-4 py-2 border-b">Gear Option</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{b._id}</td>
                <td className="px-4 py-2 border-b">{b.riderDetails?.firstName || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.riderDetails?.lastName || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.riderDetails?.email || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.riderDetails?.mobile || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.bikeModel || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  {b.pickupDate ? format(new Date(b.pickupDate), "MMM dd, yyyy") : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {b.returnDate ? format(new Date(b.returnDate), "MMM dd, yyyy") : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{b.totalDays || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.paymentStatus || "Pending"}</td>
                <td className="px-4 py-2 border-b">{b.licenceDetails?.licenceNumber || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  {b.licenceDetails?.licenceExpiry
                    ? format(new Date(b.licenceDetails.licenceExpiry), "MMM dd, yyyy")
                    : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{b.licenceDetails?.licenceState || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.gearOption || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .overflow-auto::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: #facc15;
          border-radius: 4px;
        }
        .overflow-auto::-webkit-scrollbar-track {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default AdminBikeHire;