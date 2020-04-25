import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { Field, reduxForm, SubmissionError } from "redux-form";

// import hsitory from ''
import { BrowserRouter as Router, Link as LinkTo } from "react-router-dom";

import * as firebase from "firebase";
import Link from "@material-ui/core/Link";

var firebaseConfig = {
  apiKey: "AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y",
  authDomain: "utsc-projects.firebaseapp.com",
  databaseURL: "https://utsc-projects.firebaseio.com",
  projectId: "utsc-projects",
  storageBucket: "utsc-projects.appspot.com",
  messagingSenderId: "109791671007",
  appId: "1:109791671007:web:23cdd1c32c44ea59bd6f6a",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <>
    <TextField
      fullWidth
      id={label}
      label={label}
      {...input}
      variant="outlined"
      type={type}
    />

    {touched && error && <span>{error}</span>}
  </>
);

let CLogin = (props) => {
  const [error, setError] = useState("");
  const { handleSubmit } = props;

  const submit = (values) => {
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

    if (!("r_password" in values)) {
      error.password = "Required";
      isError = true;
    }

    if (!isError) {
      if (values.r_password === values.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(function () {
            let user = firebase.auth().currentUser;
            user.sendEmailVerification();
            setError("verify email");
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              setError("The password is too weak.");
            } else {
              setError(errorMessage);
            }
          });
      } else {
        setError("repeated pass doesnt match");
      }
    } else {
      setError("enter email and/or password");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid
        container
        fullWidth
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ paddingTop: "15%" }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">Sign Up</Typography>
          </Grid>
          <Grid item xs={12}>
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="r_password"
              type="password"
              component={renderField}
              label="Repeat Password"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>

          <LinkTo to="/signin">
            <Link component="button" variant="body2">
              Sign In
            </Link>
          </LinkTo>
        </Grid>
        <Typography variant="h6">{error}</Typography>
      </Grid>
    </form>
  );
};

CLogin = reduxForm({
  form: "CLogin",
})(CLogin);

export default CLogin;
