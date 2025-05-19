"use client";
import React, { useState } from "react";
import Joi from "joi-browser";
import { useRouter } from "next/navigation";
import { renderInput, renderButton } from "../../components/common/form";

const schema = {
  username: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .label("Username"),
  password: Joi.string().required().min(5).label("Password"),
  name: Joi.string().required().label("Name"),
};

const initialData = { username: "", password: "", name: "" };

const RegisterForm = () => {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;
    const errs = {};
    for (let item of error.details) errs[item.path[0]] = item.message;
    return errs;
  };

  const handleChange = ({ target: input }) => {
    const newData = { ...data, [input.name]: input.value };
    setData(newData);

    const errs = { ...errors };
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: schema[input.name] };
    const { error } = Joi.validate(obj, subSchema);
    if (error) errs[input.name] = error.details[0].message;
    else delete errs[input.name];
    setErrors(errs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs || {});
    if (errs) return;
   
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {renderInput("username", "Username", "text", data, errors, handleChange)}
        {renderInput("password", "Password", "password", data, errors, handleChange)}
        {renderInput("name", "Name", "text", data, errors, handleChange)}
        {renderButton("Register", validate)}
      </form>
    </div>
  );
};

export default RegisterForm;