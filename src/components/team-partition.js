import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "gray",
  },
  card: {
    height: "40vh",
    margin: "auto",
    width: "275px",
    marginBottom: "10px",
    marginRight: "25px",
    marginLeft: "25px",
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
  },
}));
export default function TeamPartition(props) {
  const classes = useStyle();
  const data = [
    "TeamPartition",
    "TeamPartition",
    "TeamPartition",
    "TeamPartition",
  ];

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
