import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gameCodeContainer: {
    height: "100%",
    width: "26vh",
    fontSize: "3vh",
    display: "flex",
    alignItems: "center"

  }
}))
export default function GameCode(props) {
  const classes = useStyles()
  return (
    <div className={classes.gameCodeContainer}>
      <div >{`Game Code: ${props.code}`}</div>
      
    </div>
  );
}
