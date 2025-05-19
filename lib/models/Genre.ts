const Joi = require("joi");
const mongoose = require("mongoose");

export const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});
export const Genre =mongoose.models.Genre || mongoose.model("Genre", genreSchema);

interface IGenre{
    name: string;
}

export function validateGenre(genre: IGenre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.object(schema).validate(genre);
}


