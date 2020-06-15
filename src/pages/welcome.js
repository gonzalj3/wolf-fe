import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { STUDENTJOIN, TEACHERJOIN } from "../Routes";
const useStyles = makeStyles({
  appBar: {
    background: "orange",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
  link: {
    background: "transparent",
    color: "white",
    border: "none",
    textDecoration: "none",
  },
});

const Welcome = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div></div>
          <a href={TEACHERJOIN} className={classes.link}>
            join as teacher
          </a>
          <a href={STUDENTJOIN} className={classes.link}>
            join as student
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Welcome;
