import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import TeamPartition from "../components/team-partition.js";
import NavBar from "../components/navbar.js";
import Question from "../components/question.js";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { GameInfoProvider } from "../context/GameInfoContext.js";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "#D3D3D3",
  },
}));

const socket = socketIOClient("ws://wolfgamebetabe.herokuapp.com:5000/game");
export default function StudentGame() {
  const classes = useStyles();
  let [data, setData] = useState(null);

  useEffect(() => {
    /*socket.on("getGameEvent", (data) => {
      console.log("on hi got some data : ", data);
    });
    */
    //let gameRoom = localStorage.gameCode;
    const gameCode = localStorage.getItem("gameCode");
    const name = localStorage.getItem("name");

    console.log("about to join game room: ", gameCode, name);
    let studentInfo = { room: gameCode, name: name };
    socket.emit("joinGameRoom", studentInfo);
    socket.on("gameData", (gameData) => {
      console.log(`gameData is ${gameData}`);
      setData(gameData);
    });
    socket.on("newTeamUpdate", (data) => {
      console.log("We are getting new data about a new Team.");
      setData(data);
    });
    socket.on("newQuestionUpdate", (data) => {
      //console.log(data);
      setData(data);
      window.location.reload();

      //This should be done at load time.
      /*if (data.question.index) {
        localStorage.setItem("lastQuestion", data.question.index);
      }*/
    });
    socket.on("setAnswerUpdate", (data) => {
      setData(data);
    });
  }, data);

  function TeamsAndRoster(props) {
    const gameInfo = props.data;
    if (gameInfo) {
      return (
        <div className={classes.container}>
          <TeamPartition data={gameInfo} isTeacher={false}></TeamPartition>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div>
      <NavBar></NavBar>
      <GameInfoProvider
        value={{
          socket: socket,
          isTeacher: false,
          student: localStorage.getItem("name"),
        }}
      >
        <DragDropContext>
          <TeamsAndRoster data={data} />
        </DragDropContext>
        <Question data={data}></Question>
      </GameInfoProvider>
    </div>
  );
}
