"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import NavBar from "../../components/navBar";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
      <NavBar />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
                <h2 className="text-xl font-semibold">
                  Welcome, {user?.firstName}!
                </h2>
                <p className="mt-2">Your email: {user?.email}</p>
                <p className="mt-2">Your role: {user?.isAdmin ? "Admin" : "Cashier"}</p>
                {/* Add your video rental content here */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
