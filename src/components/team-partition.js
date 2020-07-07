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
    //backgroundColor: "#D3D3D3",
    marginLeft: "25px",
    marginRight: "25px",
    /*
    border: "2px",
    borderStyle: "solid",
    borderColor: "yellow",*/
  },
  card: {
    height: "40vh",
    width: "220px",
    marginBottom: "10px",
    marginRight: "25px",
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
  },
}));
export default function TeamPartition(props) {
  const classes = useStyle();
  /*const data = [
    { name: "Red Wolves", score: "8", color: "red" },
    { name: "Yellow Wolves", score: "2", color: "yellow" },
    { name: "Green Wolves", score: "6", color: "green" },
    { name: "Blue Wolves", score: "7", color: "blue" },
  ];*/

  return (
    <div className={classes.container}>
      {initialData.teams.map((item) => (
        <Team
          id={item.id}
          name={item.name}
          score={item.score}
          color={item.color}
        ></Team>
      ))}
    </div>
  );
}
