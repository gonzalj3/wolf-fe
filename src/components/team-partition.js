import React from "react";
import { makeStyles } from "@material-ui/core";
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
  const data = ["TeamPartition", "TeamPartition", "TeamPartition"];

  return (
    <div className={classes.container}>
      {data.map((item) => (
        <Card className={classes.card}>
          <CardContent>
            <Typography>{item}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
