const Joi = require("joi");
const mongoose = require("mongoose");

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
export const Rental = mongoose.models.Rental || mongoose.model("Rental", rentalSchema);

interface IRental {
  customerId: string;
  movieId: string;
}

export function validateRental(rental: IRental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.object(schema).validate(rental);
}


