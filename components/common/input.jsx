"use client";

import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default Input;

// don't pass label and name
