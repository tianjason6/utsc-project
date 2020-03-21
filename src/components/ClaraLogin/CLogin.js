import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { green, purple } from "@material-ui/core/colors";

export class CLogin extends Component {
  render() {
    return (
      <div>
        <Grid
          container
          fullWidth
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
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
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="pass"
                label="Password"
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
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CLogin;
