import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Field, reduxForm } from "redux-form";

import {
  BrowserRouter as Router,
  Link as LinkTo,
  Redirect,
} from "react-router-dom";

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

function Profile(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        props.history.push('/signin')
      })
      .catch(function (error) {
        // An error happened.
        setError(error);
        console.log(error)
      });

  };

  

  var user = firebase.auth().currentUser;

  return (
    <div>
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
          {/* {check} */}
          {user ? (
            <div>
              <Grid item>
                <Typography variant="h4">Welcome {user.email}</Typography>
              </Grid>
              <Grid item>
                <Button onClick={logout} variant="contained" color="primary">
                  LogOut
                </Button>
              </Grid>
            </div>
          ) : (
            <div>
              <Typography variant="h4">
                no user has signed in...
                <LinkTo to="/signin">
                  <Link component="button" variant="body2">
                    Sign In Here
                  </Link>
                </LinkTo>
              </Typography>
            </div>
          )}

          <Typography variant="h6">{error}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
