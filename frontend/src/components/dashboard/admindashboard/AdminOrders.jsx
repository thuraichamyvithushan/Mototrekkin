import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig"; // Use the configured axios instance
import { format } from "date-fns";

const AdminOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all service bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/bookings"); // Interceptor adds token
      console.log("AdminOrders: Bookings fetched", { count: res.data.length });
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("AdminOrders: Error fetching bookings", error);
      const message =
        error.response?.status === 401
          ? "Please log in as admin to view bookings"
          : error.response?.data?.message || "Failed to fetch bookings";
      setError(message);
      setLoading(false);
    }
  };

  // Delete a booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`); // Interceptor adds token
      console.log("AdminOrders: Booking deleted", { id });
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("AdminOrders: Error deleting booking", error);
      const message =
        error.response?.status === 401
          ? "Please log in as admin to delete bookings"
          : error.response?.data?.message || "Failed to delete booking";
      alert(message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-black p-4">Loading bookings...</p>;
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
      <h1 className="text-2xl font-bold mb-4">All Service Bookings</h1>

      <div className="max-w-6xl mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[80vh]">
        <table className="w-max min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border-b">Booking ID</th>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Mobile</th>
              <th className="px-4 py-2 border-b">Motorcycle Make</th>
              <th className="px-4 py-2 border-b">Model</th>
              <th className="px-4 py-2 border-b">Year</th>
              <th className="px-4 py-2 border-b">Registration State</th>
              <th className="px-4 py-2 border-b">VIN</th>
              <th className="px-4 py-2 border-b">Rego Plate</th>
              <th className="px-4 py-2 border-b">Rego Expiry</th>
              <th className="px-4 py-2 border-b">Current Kms</th>
              <th className="px-4 py-2 border-b">Last Service Date</th>
              <th className="px-4 py-2 border-b">New Tyres</th>
              <th className="px-4 py-2 border-b">Ongoing Faults</th>
              <th className="px-4 py-2 border-b">Faults Description</th>
              <th className="px-4 py-2 border-b">Work Summary</th>
              <th className="px-4 py-2 border-b">Preferred Date</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{b._id}</td>
                <td className="px-4 py-2 border-b">{b.firstName}</td>
                <td className="px-4 py-2 border-b">{b.lastName || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.email}</td>
                <td className="px-4 py-2 border-b">{b.mobileNumber}</td>
                <td className="px-4 py-2 border-b">{b.motorcycleMake}</td>
                <td className="px-4 py-2 border-b">{b.motorcycleModel}</td>
                <td className="px-4 py-2 border-b">{b.motorcycleYear || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.registrationState}</td>
                <td className="px-4 py-2 border-b">{b.vinNumber || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.regoPlate || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  {b.regoExpiry ? format(new Date(b.regoExpiry), "MMM dd, yyyy") : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{b.currentKms || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  {b.lastServiceDate ? format(new Date(b.lastServiceDate), "MMM dd, yyyy") : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{b.newTyres}</td>
                <td className="px-4 py-2 border-b">{b.ongoingFaults}</td>
                <td className="px-4 py-2 border-b">{b.faultsDescription || "N/A"}</td>
                <td className="px-4 py-2 border-b">{b.summaryOfWork}</td>
                <td className="px-4 py-2 border-b">
                  {b.preferredDateTime ? format(new Date(b.preferredDateTime), "MMM dd, yyyy HH:mm") : "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{b.status || "Pending"}</td>
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

export default AdminOrders;