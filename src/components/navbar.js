import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appBar: {
    background: props => props.data.color,//"primary",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    backgroundRepeat: "no-repeat",
    width: 64,
    height: 64,
  },
});

export default function NavBar(props) {
  //Check if we have a student if so pass props to useStyles
  console.log("this is props.data.color : ", props.data.color)
  const classes = useStyles(props);
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div>
            <img
              src="/images/wolf_icon.png"
              alt="bug"
              className={classes.icon}
            />
            <div>{"wolfgame"}</div>
          </div>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
