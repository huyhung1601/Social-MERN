import React, { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  /**Handle Input Change */
  const handleChange = (name,value) => {
    const newValue = { ...values, [name]: value };
    setValues(newValue);
  };

  //Reset Form
  const resetForm = () => {
    setValues(initialValues);
  };
  return {
    values,
    handleChange,
    resetForm,
    setValues,
  };
};
