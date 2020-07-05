import React from "react";
import NavBar from "../components/navbar";
import GameCode from "../components/gamecode-button";
import ScoreBoardButton from "../components/scoreboard-button";
import ReportButton from "../components/report-button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Roster from "../components/roster";
import TeamPartition from "../components/team-partition";
import Query from "../components/query";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "gray",
    border: "2px",
    borderStyle: "solid",
    borderColor: "yellow",
  },
}));
export default function GameBoard() {
  const classes = useStyle();

  return (
    <div>
      <NavBar>
        <GameCode code={123} />
        <ScoreBoardButton />
        <ReportButton />
        <ExpandMoreIcon />
      </NavBar>
      <div className={classes.container}>
        <TeamPartition></TeamPartition>
        <Roster></Roster>
      </div>
      <Query></Query>
    </div>
  );
}