import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { green, purple } from "@material-ui/core/colors";
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y",
  authDomain: "utsc-projects.firebaseapp.com",
  databaseURL: "https://utsc-projects.firebaseio.com",
  projectId: "utsc-projects",
  storageBucket: "utsc-projects.appspot.com",
  messagingSenderId: "109791671007",
  appId: "1:109791671007:web:23cdd1c32c44ea59bd6f6a"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default function NewLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    
  
  const authUser = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    
  }
  const handleEmail = (e) => { 
    setEmail(e.target.value);
  }
  const handlePassword = (e) => { 
    setPassword(e.target.value);
  }
  return (
    <div>
        {/* <Grid
          container
          fullWidth
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
        > */}
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <br />
            <br />
            <Grid item>
              <Typography variant="h4">Sign Up</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                onChange={handleEmail}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="pass"
                label="Password"
                onChange={handlePassword}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="r-pass"
                label="Repeat Password"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={authUser}color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        {/* </Grid> */}
      </div>
  )
}
