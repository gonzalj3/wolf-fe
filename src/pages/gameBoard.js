import React, { useState } from "react";
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

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "#D3D3D3",
    /*border: "2px",
    borderStyle: "solid",
    borderColor: "yellow",*/
  },
}));
export default function GameBoard() {
  const classes = useStyle();
  let [data, setData] = useState(initialData);

  function onDragEnd(result) {
    //
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStudents = Array.from(data.roster.students);
    console.log(newStudents);
    newStudents.splice(source.index, 1);
    newStudents.splice(destination.index, 0, draggableId);
    console.log(newStudents);
    const newRoster = {
      students: newStudents,
    };

    const newData = {
      ...data,
      roster: newRoster,
    };

    setData(newData);
  }
  return (
    <div>
      <NavBar>
        <GameCode code={123} />
        <ScoreBoardButton />
        <ReportButton />
        <ExpandMoreIcon />
      </NavBar>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.container}>
          <TeamPartition></TeamPartition>
          <Roster rosterList={data}></Roster>
        </div>
      </DragDropContext>
      <Query></Query>
    </div>
  );
}
