"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "../../components/common/pagination";
import ListGroup from "../../components/common/listGroup";
import { paginate } from "../../utils/paginate";
import MoviesTable from "../../components/moviesTable";
import _ from "lodash";
import Link from "next/link";
import SearchBox from "../../components/common/searchBox";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([{_id: "", name: "All Genres"}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  // Fetch movies and genres from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await fetch("/api/movies");
        const genresRes = await fetch("/api/genres");
        const moviesData = await moviesRes.json();
        const genresData = await genresRes.json();
        setMovies(moviesData);
        setGenres(prev => [...prev, ...genresData]);
      } catch (error) {
        toast.error("Failed to fetch movies or genres.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const updatedMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);

    try {
      await fetch(`/api/movies/${movie._id}`, { method: "DELETE" });
    } catch (ex) {
      toast("This movie has already been deleted.");
      setMovies(originalMovies);
    }
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPageData = () => {
    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  const { totalCount, data: paginatedMovies } = getPageData();

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-8">
      <div className="md:w-1/4">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>

      <div className="flex-1">
        <Link
          href="movies/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition"
        >
          New Movie
        </Link>
        <p className="mb-3 text-gray-700">
          Showing {totalCount} movies in the database
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={paginatedMovies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
