import React from "react";
import { makeStyles } from "@material-ui/core";
import Team from "../components/team";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "1500px",

    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "gray",
    marginLeft: "25px",
    marginRight: "25px",

    border: "2px",
    borderStyle: "solid",
    borderColor: "yellow",
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
  const data = [
    { name: "Red Wolves", score: "8" },
    { name: "Yellow Wolves", score: "2" },
    { name: "Green Wolves", score: "6" },
    { name: "Blue Wolves", score: "7" },
  ];

  return (
    <div className={classes.container}>
      {data.map((item) => (
        <Team name={item.name} score={item.score}></Team>
      ))}
    </div>
  );
}
