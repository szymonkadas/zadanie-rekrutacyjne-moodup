import { isSuccessfulValidation } from "./isSuccessfulValidation.ts";
import { emailRegex } from "./validationRegexps.ts";

export const validateEmail = ({ email }: { email: string }) => {
  const parsedFormData = {
    email: email.trim(),
  };
  const errors: { email: string } = {
    email: "",
  };
  if (!parsedFormData.email) {
    errors.email = "Email jest wymagany";
  } else if (!emailRegex.test(parsedFormData.email)) {
    errors.email = "Podany email jest niepoprawny";
  }
  return {
    errors,
    success: isSuccessfulValidation(errors),
    parsedFormData,
  };
};
