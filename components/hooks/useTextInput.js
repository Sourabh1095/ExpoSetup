import React, { useState } from "react";

export function useTextInput(initialValue, validationType) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const validateInput = (text) => {
    //regex list
    const mobileNumberRegex = /^\+91[6-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    //conditions for different validations
    switch (validationType) {
      case "mobEmail":
        if (
          !text ||
          (!mobileNumberRegex.test(text) && !emailRegex.test(text))
        ) {
          return "Invalid input. Please enter a valid mobile number or email address";
        }
        return "";
      case "password":
        if (!text || !passwordRegex.test(text)) {
          return "Password must contain at least 1 capital letter, 1 small letter, 1 digit, 1 special character, and be minimum length of 8 characters";
        }
        return "";
      case "name":
        if (!text || !nameRegex.test(text)) {
          return "Name must contain only letters and spaces";
        }
        return "";
      case "phone":
        if (!text || !mobileNumberRegex.test(text)) {
          return "Enter a valid mobile number";
        }
        return "";
      case "email":
        if (!text || !emailRegex.test(text)) {
          return "Enter a valid email ID";
        }
        return "";
      default:
        return "";
    }
  };

  const onChangeText = (text) => {
    setValue(text);
    if (validationType) {
      const errorMessage = validateInput(text);
      setError(errorMessage);
    }
  };

  return [value, onChangeText, error];
}
