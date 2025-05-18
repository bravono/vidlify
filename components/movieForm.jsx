import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

const initialData = {
  title: "",
  genreId: "",
  numberInStock: "",
  dailyRentalRate: "",
};

const MovieForm = () => {
  const router = useRouter();
  const params = useParams();
  const movieId = params?.id;
  const [data, setData] = useState(initialData);
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      const genresRes = await getGenres();
      setGenres(genresRes.data || []);
    };

    const fetchMovie = async () => {
      if (!movieId || movieId === "new") return;
      try {
        const movieRes = await getMovie(movieId);
        const movie = movieRes.data;
        setData({
          _id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        });
      } catch (ex) {
        router.push("/not-found");
      }
    };

    fetchGenres();
    fetchMovie();
    // eslint-disable-next-line
  }, [movieId]);

  const validate = () => {
    const errs = {};
    if (!data.title) errs.title = "Title is required";
    if (!data.genreId) errs.genreId = "Genre is required";
    if (!data.numberInStock) errs.numberInStock = "Number in Stock is required";
    if (!data.dailyRentalRate) errs.dailyRentalRate = "Rate is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await saveMovie(data);
    router.push("/movies");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Movie Form</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.title && (
            <div className="text-red-500 text-sm mt-1">{errors.title}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Genre</label>
          <select
            name="genreId"
            value={data.genreId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genreId && (
            <div className="text-red-500 text-sm mt-1">{errors.genreId}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Number in Stock</label>
          <input
            name="numberInStock"
            type="number"
            value={data.numberInStock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.numberInStock && (
            <div className="text-red-500 text-sm mt-1">
              {errors.numberInStock}
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Rate</label>
          <input
            name="dailyRentalRate"
            type="number"
            step="0.1"
            value={data.dailyRentalRate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.dailyRentalRate && (
            <div className="text-red-500 text-sm mt-1">
              {errors.dailyRentalRate}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
