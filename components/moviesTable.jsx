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
        <Link href={`/movies/${movie._id}`}>{movie.title}</Link>
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

  // Only show delete button if user is present (optional)
  if (user) {
    columns.push({
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    });
  }

  return (
    <div>
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
