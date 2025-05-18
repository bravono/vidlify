import React from "react";

// columns: array
// sortColumn: object
// onSort: function

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <span className="ml-2">&#9650;</span>; // ▲
    return <span className="ml-2">&#9660;</span>; // ▼
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => column.path && raiseSort(column.path)}
            className={`px-4 py-2 border-b border-gray-200 text-left font-semibold bg-gray-50 select-none cursor-pointer transition-colors hover:bg-blue-50 ${
              column.path ? "" : "cursor-default hover:bg-gray-50"
            }`}
            scope="col"
          >
            {column.label}
            {column.path && renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
