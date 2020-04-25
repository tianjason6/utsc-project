import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm, SubmissionError } from "redux-form";

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
      variant="outlined"
      {...input}
      type={type}
    />

    {touched && error && <span>{error}</span>}
  </>
);

let CSignIn = (props) => {
  let [errorM, setErrorM] = useState("");
  const { handleSubmit } = props; //hmmhmhmhmhmhmhmhmhm ask

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

    if (isError) {
      setErrorM("enter email and/or password")
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .catch(function (error) {
          isError = true;
          setErrorM(error.message);
        });
      if (isError === false) {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            let userid = firebase.auth().currentUser;
            if (userid && userid.emailVerified) {
              props.history.push("/profile");
            } else {
              setErrorM("verify yo email");
            }
          }
        });
      }
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
            <Typography variant="h4">Sign In</Typography>
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

          {<div>{errorM}</div>}
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>

          <LinkTo to="/login">
            <Link component="button" variant="body2">
              Create Account
            </Link>
          </LinkTo>
        </Grid>
      </Grid>
      }
    </form>
  );
};

CSignIn = reduxForm({
  form: "CSignIn",
})(CSignIn);

export default CSignIn;
