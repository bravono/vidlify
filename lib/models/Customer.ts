// Correct way in Next.js/TypeScript:
import Joi from "joi";
import mongoose from "mongoose";

export const Customer = mongoose.models.Customer || mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

interface ICustomer {
  isGold: boolean;  
  name: string;
  phone: string;
};

export function validateCustomer(customer: ICustomer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(11),
  };

  return Joi.object(schema).validate(customer);
}


