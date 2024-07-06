import { isSuccessfulValidation } from "./isSuccessfulValidation.ts";
import {
  lowercaseRegex,
  specialRegex,
  uppercaseRegex,
} from "./validationRegexps.ts";

export const validatePassword = ({ password }: { password: string }) => {
  const parsedFormData = {
    password: password,
  };
  const errors: { password: string } = {
    password: "",
  };

  const uppercases = parsedFormData.password.match(uppercaseRegex);
  const lowercases = parsedFormData.password.match(lowercaseRegex);
  const specials = parsedFormData.password.match(specialRegex);

  if (!parsedFormData.password) {
    errors.password = "Hasło jest wymagane";
  } else if (parsedFormData.password.length < 8) {
    errors.password = "Hasło powinno mieć min. 8 znaków";
  } else if (parsedFormData.password.length > 40) {
    errors.password = "Hasło powinno mieć max. 40 znaków";
  } else if (
    (!uppercases && !lowercases && specials && specials.length < 3) ||
    !specials
  ) {
    errors.password =
      "Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę oraz minimum dwa znaki" +
      " specjalne.";
  }

  return {
    errors,
    success: isSuccessfulValidation(errors),
    parsedFormData,
  };
};
