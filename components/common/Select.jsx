import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default Select;
