import React from "react";
import Link from "next/link";
import Table from "./common/table";
import Like from "./common/like";

const MoviesTable = ({
  movies,
  onSort,
  sortColumn,
  onLike,
  onDelete,
  user,
}) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link
          href={`/movies/${movie._id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      ),
    },
  ];

  if (user) {
    columns.push({
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Delete
        </button>
      ),
    });
  }

  return (
    <div className="overflow-x-auto rounded shadow bg-white p-4">
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </div>
  );
};

export default MoviesTable;
