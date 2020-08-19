import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import NavBar from "../components/navbar";
import GameCode from "../components/gamecode-button";
import ScoreBoardButton from "../components/scoreboard-button";
import ReportButton from "../components/report-button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Roster from "../components/roster";
import TeamPartition from "../components/team-partition";
import Query from "../components/query";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../data/initial-data";
import { authFetch } from "../helpers/authFetch.js";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "#D3D3D3",
  },
}));
const socket = socketIOClient("ws://localhost:5000/game");
export default function GameBoard() {
  const classes = useStyle();
  let [data, setData] = useState(null);
  const url = "http://localhost:4000/api/game/current";

  useEffect(() => {
    //Ensure that we are authorized to fetch data.
    socket.on("getGameEvent", (data) => {
      console.log("on hi got some data : ", data);
    });
    socket.on("newStudent", (data) => {
      console.log("new student: ", data);
      setData(data);
    });
    authFetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log("got response");
        console.log(res);
        //let gameCode = "gameCode";
        socket.emit("registerSocket", { gameCode: res.gameCode });
        console.log("sent gamecode", res.gameCode);
        localStorage.setItem("gameCode", res.gameCode);
        setData(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, data);

  function onDragEnd(result) {
    //
    console.log("in ondragend");
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log("nodestination");
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("droppable adn index same");

      return;
    }
    console.log("droppable", data.droppable);
    console.log("destination.droppableId", destination.droppableId);
    console.log("source.droppableId", source.droppableId);
    const start = data.droppable[source.droppableId];
    const finish = data.droppable[destination.droppableId];
    console.log("finish droppable", finish);
    if (start === finish) {
      console.log(start, finish);
      const newStudents = Array.from(start.students);
      console.log(newStudents);
      newStudents.splice(source.index, 1);
      newStudents.splice(destination.index, 0, draggableId);
      console.log(newStudents);
      const newRoster = {
        ...start,
        students: newStudents,
      };

      const newData = {
        ...data,
        droppable: {
          ...data.droppable,
          [start.id]: newRoster,
        },
      };

      setData(newData);
      return;
    }

    //Move from roster to a team
    const startStudents = Array.from(start.students);
    startStudents.splice(source.index, 1);
    const newStart = {
      ...start,
      students: startStudents,
    };

    const finishStudents = Array.from(finish.students);
    console.log("finishStudents array:", finishStudents);
    if (finish.id == "roster") {
      finishStudents.splice(destination.index, 0, [draggableId]);
      //update code on the backend to remove student from team
    } else {
      finishStudents.splice(destination.index, 0, { id: draggableId });
    }
    console.log("new finishStudents array:", finishStudents);
    const newFinish = {
      ...finish,
      students: finishStudents,
    };

    const newData = {
      ...data,
      droppable: {
        ...data.droppable,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    let studentUpdate;
    if (finish.id == "roster") {
      studentUpdate = {
        gameCode: localStorage.getItem("gameCode"),
        team: "roster",
        student: draggableId,
      };
    } else {
      studentUpdate = {
        gameCode: localStorage.getItem("gameCode"),
        team: destination.droppableId,
        student: draggableId,
      };
    }

    console.log("what new data is", newData);
    console.log("studentUpdate", studentUpdate);
    socket.emit("moveStudent", studentUpdate);
    setData(newData);
    return;
  }
  function GameCodeVerifier(props) {
    const data = props.data;
    if (data) {
      return <GameCode code={data.gameCode} />;
    } else {
      return null;
    }
  }

  function TeamsAndRoster(props) {
    const gameInfo = props.data;
    console.log("we have a rosterlist in this : ", gameInfo);
    if (gameInfo) {
      return (
        <div className={classes.container}>
          <TeamPartition data={gameInfo} isTeacher={true}></TeamPartition>
          <Roster rosterList={gameInfo}></Roster>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div>
      <NavBar>
        <GameCodeVerifier data={data} />
        <ScoreBoardButton />
        <ReportButton />
        <ExpandMoreIcon />
      </NavBar>
      <DragDropContext onDragEnd={onDragEnd}>
        <TeamsAndRoster data={data} />
      </DragDropContext>
      <Query></Query>
    </div>
  );
}
