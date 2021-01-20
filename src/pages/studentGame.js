import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TeamPartition from "../components/team-partition.js";
import NavBar from "../components/navbar.js";
import Question from "../components/question.js";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { GameInfoProvider } from "../context/GameInfoContext.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import StudentCommBar from "../components/studentCommBar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: "16px",
    backgroundColor: "#D3D3D3",
  },
}));

export default function StudentGame() {
  const classes = useStyles();
  let studentCSS = {
    color: "primary",
  };
  let [data, setData] = useState(null);
  let [team, setTeam] = useState(studentCSS);
  let [openEndDialog, setOpenEndDialog] = useState(false);
  let handProp = null;
  const gameCode = sessionStorage.getItem("gameCode");
  const name = sessionStorage.getItem("name");
  const socket =
    process.env.NODE_ENV === "production"
      ? io(process.env.REACT_APP_WS_SERVER, { transports: ["websocket"] })
      : io(process.env.REACT_APP_WS_DEV_SERVER, { transports: ["websocket"] });

  useEffect(() => {
    if (sessionStorage.getItem("gameCode") === null) {
      window.location.replace("/");
    } else {
      let studentInfo = { room: gameCode, name: name };
      socket.emit("joinGameRoom", studentInfo);
    }
    if (sessionStorage.getItem("teamColor")) {
      setTeam({ color: sessionStorage.getItem("teamColor") });
    }
    socket.on("welcome", (gameData) => {
      //Need to add logic here (if we still get data here from joinGameRoom) to store a socket.id or something in order to remember the person. probably just teh person's returned name
      sessionStorage.setItem("socketRegistered", true);
      setData(gameData);
      let hand = data
        ? Object.values(data.students).find(
            (student) => student.name === sessionStorage.getItem("name")
          ).hand
        : null;
      console.log("the hand is : ", hand);
      handProp = Object.values(gameData.students).find(
        (student) => student.name === sessionStorage.getItem("name")
      ).hand;
    });
    socket.on("newTeamUpdate", (data) => {
      setData(data);
    });
    socket.on("newQuestionUpdate", (data) => {
      setData(data);
      window.location.reload();
    });
    socket.on("setAnswerUpdate", (data) => {
      console.log("setAnswerUpdate , ", data);
      setData(data);
    });

    socket.on("colorUpdate", (data) => {
      sessionStorage.setItem("teamColor", data.color);
      setTeam(data);
    });

    socket.on("endGame", (data) => {
      if (gameCode == data.gameCode) {
        //we open a dialog box here.
        sessionStorage.removeItem("gameCode");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("teamColor");
        sessionStorage.removeItem("socketRegistered");

        setOpenEndDialog(true);
      }
    });
    socket.on("teamPoint", (data) => {
      setData(data);
    });
  }, []);

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
          hand: data
            ? Object.values(data.students).find(
                (student) => student.name === sessionStorage.getItem("name")
              ).hand
            : null,
        }}
      >
        <DragDropContext>
          <TeamsAndRoster data={data} />
        </DragDropContext>
        <Question data={data}></Question>
        <StudentCommBar data={data}></StudentCommBar>
      </GameInfoProvider>
      <Dialog open={openEndDialog}>
        <DialogTitle>End of Game!</DialogTitle>
      </Dialog>
    </div>
  );
}
