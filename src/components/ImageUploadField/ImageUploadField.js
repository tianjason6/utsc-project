import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import styles from "./LoginForm.module.css";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles.Field}>
    <label>{label}</label>

    {label === "Message" ? (
      <textarea
        className={styles.Message}
        {...input}
        placeholder={label}
        type={type}
      />
    ) : (
      <input
        className={styles.Regular}
        {...input}
        placeholder={label}
        type={type}
      />
    )}

    {touched && error && <span>{error}</span>}
  </div>
);

let LoginForm = props => {
  const { handleSubmit } = props;

  const submit = values => {
    let error = {};
    let isError = false;

    if (!("email" in values)) {
      error.email = "Required";
      isError = true;
    }

    if (!("password" in values)) {
      error.password = "Required";
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      props.onInitSignIn(values.email, values.password);
    }
  };

  return (
   
  );
};

LoginForm = reduxForm({
  // a unique name for the form
  form: "LoginForm"
})(LoginForm);

export default LoginForm;
