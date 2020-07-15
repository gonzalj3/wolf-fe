import React from "react";
import { makeStyles } from "@material-ui/core";
import Team from "../components/team";
import initialData from "../data/initial-data";

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

  return (
    <div className={classes.container}>
      {props.data.TeamOrder.map((item) => {
        const team = props.data.droppable[item];
        console.log(item, team);
        return (
          <Team
            id={team.id}
            name={team.name}
            score={team.score}
            color={team.color}
            rosterList={team.students}
            students={props.data.students}
          ></Team>
        );
      })}
    </div>
  );
}
