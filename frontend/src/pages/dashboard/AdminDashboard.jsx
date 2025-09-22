import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  Calendar,
  LogOut,
} from "lucide-react";
import AdminDashboardDefaultData from "../../components/dashboard/admindashboard/AdminDashboardDefaultData";
import AdminUsers from "../../components/dashboard/admindashboard/AdminUsers";
import AdminOrders from "../../components/dashboard/admindashboard/AdminOrders";
import AdminProducts from "../../components/dashboard/admindashboard/AdminProducts";
import AdminEvents from "../../components/dashboard/admindashboard/AdminEvents";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboardDefaultData />;
      case "users":
        return <AdminUsers />;
      case "orders":
        return <AdminOrders />;
      case "products":
        return <AdminProducts />;
      case "events":
        return <AdminEvents />;
      case "logout":
        return <div><h2 className="text-2xl font-bold">Logged Out</h2></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 flex flex-col items-center">
          <h2 className="font-semibold text-lg mb-2">Admin</h2>
        </div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "dashboard"
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "users"
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5 mr-2" /> Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "orders"
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "products"
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Box className="w-5 h-5 mr-2" /> Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("events")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeTab === "events"
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" /> Events
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("logout")}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
