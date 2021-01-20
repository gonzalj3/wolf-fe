import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { GameInfoContext } from "../context/GameInfoContext.js";
import Emoji from "./emoji";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "20px",
    marginLeft: "45vw",
    marginRight: "45vw",
    backgroundColor: "#FAFAFA",
  },
}));

export default function StudentCommBar() {
  const gameInfo = useContext(GameInfoContext);
  const socket = gameInfo.socket;
  const [hand, setHand] = useState(false);
  const classes = useStyles();

  //We will use the useEffect hook to update the state of hand
  //we need to use useEffect since we are getting new info on the socket
  //one level higher in studentGame.js
  useEffect(() => {
    let handProp = gameInfo.hand;
    setHand(handProp);
  }, [gameInfo.hand]);

  const callTeacher = () => {
    socket.emit("studentHandRaise", {
      student: gameInfo.student,
      gameCode: sessionStorage.getItem("gameCode"),
      hand: !hand,
    });
    setHand(!hand);
  };
  //The hand state tells us whether a student is raising their hand.
  //And hand is the inverse of gray for the emoji componenet. Since
  //if a student raises their hand then we should not have the state
  //of the emoji as gray.
  return (
    <Button className={classes.container} onClick={callTeacher}>
      <Emoji symbol="✋" label="hand" gray={!hand}></Emoji>
    </Button>
  );
}
