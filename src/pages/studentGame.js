import React, { useEffect, useState } from "react";
import io from "socket.io-client";
//import io from "socket.io"
import TeamPartition from "../components/team-partition.js";
import NavBar from "../components/navbar.js";
import Question from "../components/question.js";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { GameInfoProvider } from "../context/GameInfoContext.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  let studentCSS = {
    color: "primary",
  }
  let [data, setData] = useState(null);
  let [team, setTeam] = useState(studentCSS)
  let [openEndDialog, setOpenEndDialog] = useState(false)

  const gameCode = sessionStorage.getItem("gameCode");
  const name = sessionStorage.getItem("name");
  const socket = process.env.NODE_ENV === 'production' ? io(process.env.REACT_APP_WS_SERVER, {transports: ['websocket']}) : io(process.env.REACT_APP_WS_DEV_SERVER, {transports: ['websocket']})
  console.log(" soemthing fishy ")  

  console.log(" here is our gameCode and name : ", gameCode, name)
  console.log(" typeof gamecode ", typeof(gameCode))  


console.log("about to join game room: ", gameCode, name);

console.log("the process env : ", process.env.NODE_ENV)

  useEffect(() => {
    if (gameCode === null){
      console.log(" we are now moving to different place gameCode")
      window.location.replace("/");
    } else {
      let studentInfo = { room: gameCode, name: name };
      socket.emit("joinGameRoom", studentInfo);
    }
    console.log("team color is : ", sessionStorage.getItem("teamColor"))
    if(sessionStorage.getItem("teamColor")){
      setTeam({color: sessionStorage.getItem("teamColor")})
    }
    socket.on("welcome", (gameData) => {
      console.log(`gameData is ${gameData}`, gameData);
      //Need to add logic here (if we still get data here from joinGameRoom) to store a socket.id or something in order to remember the person. probably just teh person's returned name
      sessionStorage.setItem("socketRegistered", true)
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

    });
    socket.on("setAnswerUpdate", (data) => {
      console.log("setAnswerUpdate , ", data);
      setData(data);
    });

    socket.on("colorUpdate", (data) => {
      console.log("got a new color: ", data)
      sessionStorage.setItem("teamColor", data.color)
      setTeam(data)
    })

    socket.on("endGame", (data) => {
      console.log("game over! data : ", data)
      if(gameCode == data.gameCode){
        //we open a dialog box here. 
        sessionStorage.removeItem("gameCode")
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("teamColor")
        sessionStorage.removeItem("socketRegistered")

        setOpenEndDialog(true)
      }
    })


  }, [])



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
          student: sessionStorage.getItem("name"),
        }}
      >
        <DragDropContext>
          <TeamsAndRoster data={data} />
        </DragDropContext>
        <Question data={data}></Question>
      </GameInfoProvider>
      <Dialog open={openEndDialog}><DialogTitle>End of Game!</DialogTitle></Dialog>
    </div>
  );
}
