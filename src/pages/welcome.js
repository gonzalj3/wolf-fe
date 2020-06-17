import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import LogIn from "../components/dialog-LogIn";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "primary",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default function Welcome() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div></div>
          <LogIn buttonTitle={`Teacher`} />
          <LogIn buttonTitle={`Student`} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
