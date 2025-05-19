import Joi from "joi";
import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true,
      },

      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
    }),
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50,
        required: true,
      },

      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
  },

  dateOut: {
    type: Date,
    default: Date.now,
  },

  dateReturned: {
    type: Date,
  },

  retntalFee: {
    type: Number,
    min: 0,
  },
});
export const Rental =
  mongoose.models.Rental || mongoose.model("Rental", rentalSchema);

interface IRental {
  customerId: string;
  movieId: string;
}

export function validateRental(rental: IRental) {
  const schema = {
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    movieId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  };

  return Joi.object(schema).validate(rental);
}
