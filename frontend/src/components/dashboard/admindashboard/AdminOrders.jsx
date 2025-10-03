import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/api/bookings";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  if (loading) return <p className="text-black p-4">Loading bookings...</p>;

  return (
    <div className="p-4 w-full h-full text-black">
      <h1 className="text-2xl font-bold mb-4">All Service Bookings</h1>

  
      <div className="max-w-6xl mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg max-h-[80vh]">
        <table className="w-max min-w-full table-auto text-sm text-left border-collapse">
         <thead className="bg-gray-200 sticky top-0 z-10">
  <tr>
    <th className="px-4 py-2 border-b">First Name</th>
    <th className="px-4 py-2 border-b">Last Name</th>
    <th className="px-4 py-2 border-b">Email</th>
    <th className="px-4 py-2 border-b">Mobile</th>
    <th className="px-4 py-2 border-b">Work Phone</th>
    <th className="px-4 py-2 border-b">Home Phone</th>
    <th className="px-4 py-2 border-b">Street Address</th>
    <th className="px-4 py-2 border-b">City</th>
    <th className="px-4 py-2 border-b">State</th>
    <th className="px-4 py-2 border-b">Post Code</th>
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
    <th className="px-4 py-2 border-b">Actions</th>
  </tr>
</thead>
<tbody>
  {bookings.map((b) => (
    <tr key={b._id} className="hover:bg-gray-100">
      <td className="px-4 py-2 border-b">{b.firstName}</td>
      <td className="px-4 py-2 border-b">{b.lastName}</td>
      <td className="px-4 py-2 border-b">{b.email}</td>
      <td className="px-4 py-2 border-b">{b.mobileNumber}</td>
      <td className="px-4 py-2 border-b">{b.workPhone || "-"}</td>
      <td className="px-4 py-2 border-b">{b.homePhone || "-"}</td>
      <td className="px-4 py-2 border-b">
        {b.streetAddress} {b.streetAddress2 || ""}
      </td>
      <td className="px-4 py-2 border-b">{b.city}</td>
      <td className="px-4 py-2 border-b">{b.state}</td>
      <td className="px-4 py-2 border-b">{b.postCode}</td>
      <td className="px-4 py-2 border-b">{b.motorcycleMake}</td>
      <td className="px-4 py-2 border-b">{b.motorcycleModel}</td>
      <td className="px-4 py-2 border-b">{b.motorcycleYear}</td>
      <td className="px-4 py-2 border-b">{b.registrationState}</td>
      <td className="px-4 py-2 border-b">{b.vinNumber}</td>
      <td className="px-4 py-2 border-b">{b.regoPlate}</td>
      <td className="px-4 py-2 border-b">
        {b.regoExpiry ? new Date(b.regoExpiry).toLocaleDateString() : "N/A"}
      </td>
      <td className="px-4 py-2 border-b">{b.currentKms}</td>
      <td className="px-4 py-2 border-b">
        {b.lastServiceDate
          ? new Date(b.lastServiceDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="px-4 py-2 border-b">{b.newTyres}</td>
      <td className="px-4 py-2 border-b">{b.ongoingFaults}</td>
      <td className="px-4 py-2 border-b">{b.faultsDescription || "-"}</td>
      <td className="px-4 py-2 border-b">{b.summaryOfWork}</td>
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
