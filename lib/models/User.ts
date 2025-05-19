import Joi from "joi";
import mongoose from "mongoose";



const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 225,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 225,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 225,
      trim: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      trim: true,
    },

    isAdmin: Boolean,
  },
  { timestamps: true }
); // Adds createdAt & updatedAt;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
}


const User = mongoose.models.User || mongoose.model("User", userSchema);

function validateUser(user: User) {
  const schema = {
    firstName: Joi.string().min(5).max(225).required(),
    lastName: Joi.string().min(5).max(225).required(),
    email: Joi.string().min(5).max(225).required().email(),
    phone: Joi.string().min(5).max(225).required(),
    password: Joi.string().min(5).max(225).required(),
  };

  return Joi.object(schema).validate(user);
}

export { User, validateUser };
