import axios from "axios";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  // Fetch movie data from your API route
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${params.id}`
  );
  if (!res.ok) {
    return <div>Movie not found.</div>;
  }
  const movie = await res.json();

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Genre: {movie.genre?.name || movie.genre}</p>
      <p>Number in Stock: {movie.numberInStock}</p>
      <p>Daily Rental Rate: {movie.dailyRentalRate}</p>
    </div>
  );
}
