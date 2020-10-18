import React, { useEffect, useState } from "react";
import io from "socket.io-client";
//import io from "socket.io"
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

export default function StudentGame() {
  const classes = useStyles();
  let [data, setData] = useState(null);
  let studentCSS = {
    color: "primary",
  }
  let [team, setTeam] = useState(studentCSS)

  const socket = process.env.NODE_ENV === 'production' ? io(process.env.REACT_APP_WS_SERVER, {transports: ['websocket']}) : io(process.env.REACT_APP_WS_DEV_SERVER, {transports: ['websocket']})
  
  useEffect(() => {
    if(localStorage.getItem("teamColor")){
      setTeam({color:localStorage.getItem("teamColor")})
    }
    const gameCode = localStorage.getItem("gameCode");
    const name = localStorage.getItem("name");
//Add logic here to check for existing data in local storage
//if there is some then we will setData with a seperate socket event - rejoinGameRoom
//else we are new we will setData with a socket even tof joinGameRoom
    console.log("about to join game room: ", gameCode, name);
    let studentInfo = { room: gameCode, name: name };
    /*if(localStorage.getItem('socketRegistered')){
      socket.emit("updateSocketStudent", studentInfo)
    } else {*/
      socket.emit("joinGameRoom", studentInfo);
      socket.emit("updateSocketStudent", studentInfo)

    //}
    socket.on("gameData", (gameData) => {
      console.log(`gameData is ${gameData}`);
      //Need to add logic here (if we still get data here from joinGameRoom) to store a socket.id or something in order to remember the person. probably just teh person's returned name
      localStorage.setItem("socketRegistered", true)
      setData(gameData);
    });
    socket.on("newTeamUpdate", (data) => {
      console.log("We are getting new data about a new Team.");
      setData(data);
    });
    socket.on("newQuestionUpdate", (data) => {
      console.log("newQuestion Update : ", data.question);
      setData(data);
      window.location.reload();

      //This should be done at load time.
      /*if (data.question.index) {
        localStorage.setItem("lastQuestion", data.question.index);
      }*/
    });
    socket.on("setAnswerUpdate", (data) => {
      console.log("setAnswerUpdate , ", data);
      setData(data);
    });
    socket.on("colorUpdate", (data) => {
      console.log("got a new color: ", data)
      localStorage.setItem("teamColor", data.color)
      setTeam(data)
    })

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
      <NavBar data={team}></NavBar>
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
