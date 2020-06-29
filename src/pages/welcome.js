import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid, makeStyles } from "@material-ui/core";

import LogIn from "../components/dialog-LogIn";
import NavBar from "../components/navbar";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "primary",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
  img: {
    backgroundImage: 'url("/images/teresa&kim.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  vh100: {
    height: "100vh",
  },
}));

export default function Welcome() {
  const classes = useStyles();
  return (
    <div>
      <div>
        <NavBar>
          <div></div>
          <LogIn buttonTitle={`Teacher`} />
          <LogIn buttonTitle={`Student`} />
        </NavBar>
      </div>
      <div>
        {" "}
        <Grid container className={classes.vh100}>
          <Grid item md={12} xs={12} className={classes.img}>
            {}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
