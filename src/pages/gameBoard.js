import React, { useState, useEffect } from "react";
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

export default function GameBoard() {
  const classes = useStyle();
  let [data, setData] = useState(null);
  const url = "http://localhost:4000/api/game/current";

  useEffect(() => {
    authFetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log("got response");
        console.log(res);
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
    const start = data.droppable[source.droppableId];
    const finish = data.droppable[destination.droppableId];
    console.log(start, finish);
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
    finishStudents.splice(destination.index, 0, draggableId);
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
    console.log(newData);
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
