"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      const res = await fetch(`/api/movies/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMovie(data);
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Genre: {movie.genre?.name}</p>
      <p>Stock: {movie.numberInStock}</p>
      <p>Rate: {movie.dailyRentalRate}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
