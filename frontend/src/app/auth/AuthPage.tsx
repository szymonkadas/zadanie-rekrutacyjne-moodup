import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../components/Icon/Icon.tsx";
import { TextInputTypes } from "../../components/Inputs/InputType.ts";
import TextInput from "../../components/Inputs/TextInput.tsx";
import { RoutePaths } from "../../data/DataRoutes.ts";
import { loginKeys } from "../../data/loginKeys.ts";
import {
  GenericObjectWithStrings
} from "../../lib/utils/validationFunctions/isSuccessfulValidation.ts";
import styles from "./AuthPage.module.scss";
import { AuthActionEnum } from "./utils.ts";
import { validateEmail } from "../../lib/utils/validationFunctions/validateEmail.ts";
import { validatePassword } from "../../lib/utils/validationFunctions/validatePassword.ts";

// The logic here's kinda redundant and messy but its really fast dev cycle so xd (trying to deliver in 20 hours~~)
export default function AuthPage({
  authAction,
}: {
  authAction: AuthActionEnum;
}) {
  const { title, changeActionText, linkText, linkTo } =
    getAuthPageValues(authAction);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const from = location.state?.from?.pathname || RoutePaths.ROOT;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<string>
  ) => {
    setter(event.target.value);
    setErrorMessages((prevState) => ({ ...prevState, [event.target.name]: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // in case if someone manually changes button state
    const {errors: emailErrors, success: emailSuccess, parsedFormData: parsedEmailData} = validateEmail({email});
    const {errors: passwordErrors, success: passwordSuccess, parsedFormData: parsedPasswordData} = validatePassword({password});

    setErrorMessages((prevState) => ({ ...prevState, ...emailErrors, ...passwordErrors }));
    if(emailSuccess && passwordSuccess) {
      const formData = {
        email: parsedEmailData.email,
        password: parsedPasswordData.password
      };

      console.log(formData);
    //   send to backend
    //   if(AuthActionEnum.LOGIN === authAction) {
    //   navigate(from);
      console.log(from);
    }
  };

  function validateField<T extends GenericObjectWithStrings>(
    value: T,
    validateFunction: (val: T) => {
      success: boolean;
      errors: T;
      parsedFormData: T;
    },
    setError = true
  ): boolean {
    const { errors, success } = validateFunction(value);
    setError && setErrorMessages((prevState) => ({ ...prevState, ...errors }));
    return success;
  }

  const isButtonDisabled = () => {
    if(email === "" || password === "") {
      return true;
    }else{
      const emailSuccess = validateField({email}, validateEmail, false);
      const passwordSuccess = validateField({password}, validatePassword, false);
      return !emailSuccess || !passwordSuccess
    }
  }

  return (
    <>
      <Icon src={"/icons/timberman.svg"} className={styles.icon} />
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <h1 className={styles.mainContentTitle}>
            Explore "Chuck Jokes" with us!
          </h1>
          <form className={styles.mainContentForm} onSubmit={handleSubmit}>
            <TextInput
              value={email}
              type={TextInputTypes.EMAIL}
              name={loginKeys.EMAIL}
              onChange={(event) => handleChange(event, setEmail)}
              onBlur={(event)=> validateField({email: event.target.value}, validateEmail)}
              placeholder={"Type your email"}
              label={"E-mail"}
              initialStyle={styles.mainContentInput}
              maxLength={100}
              errorMessage={errorMessages.email}
            />
            <TextInput
              value={password}
              type={TextInputTypes.PASSWORD}
              name={loginKeys.PASSWORD}
              onChange={(event) => handleChange(event, setPassword)}
              onBlur={(event)=> validateField({password: event.target.value}, validatePassword)}
              placeholder={"Type your password"}
              label={"Password"}
              initialStyle={styles.mainContentInput}
              minLength={6}
              maxLength={50}
              errorMessage={errorMessages.password}
            />
            <button
              type="submit"
              className={styles.mainContentButton}
              disabled={isButtonDisabled()}
            >
              {title}
            </button>
          </form>
        </div>
        <p className={styles.changeAuthAction}>
          {changeActionText} <Link to={linkTo}>{linkText}</Link>
        </p>
      </div>
      <h4 className={styles.note}>
        "Chuck Norris can login without signing up, on any website."
      </h4>
    </>
  );
}

function getAuthPageValues(authAction: AuthActionEnum) {
  switch (authAction) {
    case AuthActionEnum.LOGIN:
      return {
        title: "Log in",
        changeActionText: "Don't have an account?",
        linkText: "Sign up here.",
        linkTo: RoutePaths.REGISTRATION,
      };
    default:
      return {
        title: "Register",
        changeActionText: "Already have an account?",
        linkText: "Log in here.",
        linkTo: RoutePaths.LOGIN,
      };
  }
}
