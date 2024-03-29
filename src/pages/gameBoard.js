import React, { useState, useEffect } from "react";
import io from "socket.io-client";
//import io from "socket.io"

import NavBar from "../components/navbar";
import GameCode from "../components/gamecode-button";

import Roster from "../components/roster";
import TeamPartition from "../components/team-partition";
import Query from "../components/query";
import { makeStyles } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { authFetch } from "../helpers/authFetch.js";
import { GameInfoProvider } from "../context/GameInfoContext.js";
import Button from "@material-ui/core/Button";
import EndGame from "../components/dialog-EndGame.js";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: "16px",
    backgroundColor: "#F4F6FF",
    width: "100%",
  },
  middlebar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "95%",
    paddingLeft: "5vw",
  },
  containerLarger: {
    backgroundColor: "#F4F6FF",
    display: "flex",
    flexDirection: "row",
  },
}));

export default function GameBoard() {
  const classes = useStyle();

  let [data, setData] = useState(null);
  let [studentResponses, setResponses] = useState([
    { name: "none", team: "none", response: "none" },
  ]);
  const socket =
    process.env.NODE_ENV === "production"
      ? io(process.env.REACT_APP_WS_SERVER, { transports: ["websocket"] })
      : io(process.env.REACT_APP_WS_DEV_SERVER, { transports: ["websocket"] });

  const url =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_SERVER_URL}api/game/current`
      : `${process.env.REACT_APP_DEV_SERVER_URL}api/game/current`;
  let teacherOrangeNavBar = {
    color: "primary",
  };

  useEffect(() => {
    socket.on("newTeamUpdate", (data) => {
      console.log("We are getting new data about a new Team.");
      setData(data);
    });
    socket.on("getGameEvent", (data) => {
      //console.log('on hi got some data : ', data);
      setData(data);
    });
    socket.on("newStudent", (data) => {
      console.log("new student: ", data);
      setData(data);
    });
    socket.on("newQuestionUpdate", (data) => {
      console.log("the data we have in newQuestionUpdate", data);
      setResponses(data.responses);

      setData(data);
    });
    socket.on("newStudentAnswer", (responses) => {
      console.log("we got some new student answer  ", responses);
      // let newData = data
      // console.log("data : ", data)
      // console.log("newData : ", newData)
      // newData.responses = data
      // setData(newData)
      //setResponses(data)
      setResponses(responses);
    });
    //Ensure that we are authorized to fetch data.
    authFetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log("got response");
        console.log(res);
        //let gameCode = "gameCode";
        socket.emit("registerSocket", { gameCode: res.gameCode });
        console.log("sent gamecode", res.gameCode);
        sessionStorage.setItem("gameCode", res.gameCode);
        setData(res);
        setResponses(res.responses);
      })
      .catch((error) => {
        console.log("error", error);
      });

    return () => {
      console.log("unmounted gameboard");
    };
  }, []);

  function onDragEnd(result) {
    //
    console.log("in ondragend");
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log("nodestination");
      return;
    }
    if (destination.droppableId === source.droppableId) {
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
        gameCode: sessionStorage.getItem("gameCode"),
        to: "roster",
        from: source.droppableId,
        student: draggableId,
      };
    } else {
      studentUpdate = {
        gameCode: sessionStorage.getItem("gameCode"),
        to: destination.droppableId,
        from: source.droppableId,
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
    if (gameInfo) {
      console.log("we have a rosterlist in this : ", gameInfo);
    }
    if (gameInfo) {
      return (
        <div className={classes.container}>
          <TeamPartition
            data={gameInfo}
            isTeacher={true}
            socket={socket}
          ></TeamPartition>
          <div className={classes.middlebar}>
            <Roster rosterList={gameInfo}></Roster>
            <EndGame></EndGame>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  //scoreboard and report button removed.

  return (
    <div>
      <NavBar data={teacherOrangeNavBar}>
        <GameCodeVerifier data={data} />
      </NavBar>
      <GameInfoProvider
        value={{
          socket: socket,
          isTeacher: true,
          gameState: data,
          responses: studentResponses,
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <TeamsAndRoster data={data} />
        </DragDropContext>
        <Query socket={socket} data={data}></Query>
      </GameInfoProvider>
    </div>
  );
}
