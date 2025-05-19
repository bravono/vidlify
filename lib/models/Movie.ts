import Joi from "joi";
import mongoose from "mongoose";
import { genreSchema } from "./Genre";


export const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

export const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

interface IMovie {
  title: string;
  genreId: string;
  numberInStock: number;
  dailyRentalRate: number;
};

export function validateMovie(movie: IMovie) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

    return Joi.object(schema).validate(movie);
  
}


