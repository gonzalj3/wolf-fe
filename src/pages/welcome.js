import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import LogIn from "../components/dialog-LogIn";
import JoinGame from "../components/dialog-JoinGame";
import NavBar from "../components/navbar";
const useStyles = makeStyles((theme) => ({
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
          <JoinGame buttonTitle={`Student`} />
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
