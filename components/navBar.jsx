import React from "react";
import Link from "next/link";
import { useAuth } from "../app/context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between w-full">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Vidlify
      </Link>
      <div className="flex space-x-4 items-center">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Movies
        </Link>
        <Link
          href="/customers"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Customers
        </Link>
        <Link
          href="/rentals"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Rentals
        </Link>
        {!user && (
          <>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {user.name}
            </Link>
            <Link
              href="/logout"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={logout}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
