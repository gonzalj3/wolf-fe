import React, { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";
import socketIOClient from "socket.io-client";
import TeamPartition from "../components/team-partition.js";
import NavBar from "../components/navbar.js";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import Question from "../components/question";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "#D3D3D3",
  },
}));

//const socketClient = new w3cwebsocket("ws://localhost:5000");
const socket = socketIOClient("ws://localhost:5000");
export default function StudentGame() {
  const classes = useStyles();
  let [data, setData] = useState(null);
  const gameCode = localStorage.getItem("gameCode");
  /*const url = "http://localhost:4000/api/joinGame/student";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameCode,
    }),
  };*/
  useEffect(() => {
    console.log("about to fetch from studentGame");
    socket.on("studentClient", (data) => {
      console.log("we got a connection", data);
    });
    socket.emit("studentServer", { hello: "from the client" });
    /*socketClient.onopen = () => {
      console.log("websocket client connected");
      socketClient.send(
        JSON.stringify({
          hi: "from client",
        })
      );
    };
    socketClient.onmessage = (message) => {
      console.log("messag:", message);
    };*/
    /*async function fetchData() {
      console.log("about to fetch from studentGame");
      await fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          console.log("got response");
          console.log(res);
          setData(res);
        })
        .catch((error) => {
          console.log("error", error);
        });

    }
    fetchData();*/
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
      <DragDropContext>
        <TeamsAndRoster data={data} />
      </DragDropContext>
      <Question></Question>
    </div>
  );
}
