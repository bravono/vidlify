"use client";
import React, { useState } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./Select";

const useForm = (initialData, schema, doSubmit) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    const newData = { ...data };
    newData[input.name] = input.value;

    setData(newData);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs || {});
    if (errs) return;
    doSubmit(data);
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    setData,
    setErrors,
    validate,
  };
};

export function renderButton(label, validate) {
  return (
    <button
      disabled={validate()}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      type="submit"
    >
      {label}
    </button>
  );
}

export function renderInput(name, label, type, data, errors, handleChange) {
  return (
    <Input
      type={type}
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
    />
  );
}

export function renderSelect(name, label, options, data, errors, handleChange) {
  return (
    <Select
      name={name}
      value={data[name]}
      label={label}
      options={options}
      onChange={handleChange}
      error={errors[name]}
    />
  );
}

export default useForm;
