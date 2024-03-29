import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appBar: {
    background: props => props.data.color,//"primary",
    height: "8vh",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    minHeight:"100%"
  },
  icon: {
    backgroundRepeat: "no-repeat",
    width: "6vh",
    height: "6vh",
  },
  name: {
  fontFamily: "Jaldi",
  fontSize: "3vh",
  marginLeft: "5px"
  },
  iconName: {
    display: "flex",
    flexDirection: "row",
    height: "8vh",
    alignItems: "center"
  }
});

export default function NavBar(props) {
  const classes = useStyles(props);
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.iconName}>
            <img
              src="/images/wolf_icon.png"
              alt="bug"
              className={classes.icon}
            />
            <div className={classes.name}>{"Wolfgame"}</div>
          </div>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
