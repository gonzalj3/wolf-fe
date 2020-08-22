import React from "react";
import { makeStyles } from "@material-ui/core";
import Team from "../components/team";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { yellow } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "1500px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: "25px",
    marginRight: "25px",
    justifyContent: "center",
  },
}));

export default function TeamPartition(props) {
  const classes = useStyle();
  const addTeam = () => {
    console.log("we are adding a team.");
    if (props.socket) {
      //console.log("the gamecode is :", props.data.gameCode);
      //console.log("we also have a socket: ", props.socket);
      let lastTeamInd = props.data.TeamOrder.length;
      let team;
      console.log("length of team: ", lastTeamInd);
      switch (lastTeamInd) {
        case 1:
          team = "yellow";
          break;
        case 2:
          team = "red";
          break;
        case 3:
          team = "green";
          break;
        case 4:
          team = "purple";
          break;
        case 5:
          team = "orange";
      }
      props.socket.emit("newTeam", {
        room: props.data.gameCode,
        team: team,
      }); //on(props.data.gameCode).;
    } else {
      console.log("we do not have any socket: ", props.socket);
    }
  };

  function AddTeamFunctionality(props) {
    console.log("************ isTeacher:", props.isTeacher);

    if (props.isTeacher) {
      return (
        <div>
          <IconButton onClick={addTeam}>
            <AddIcon></AddIcon>
          </IconButton>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={classes.container}>
      <AddTeamFunctionality isTeacher={props.isTeacher}></AddTeamFunctionality>

      {props.data.TeamOrder.map((item) => {
        const team = props.data.droppable[item];
        console.log("rosterList : ", team.students);
        console.log("students : ", props.data.students);
        return (
          <Team
            id={team.id}
            name={team.name}
            score={team.score}
            color={team.color}
            rosterList={team.students}
            students={props.data.students}
            isTeacher={props.isTeacher}
          ></Team>
        );
      })}
    </div>
  );
}
