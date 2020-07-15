import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  queryContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "10px",
  },
  students: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    height: "14vh",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    marginLeft: "5%",
    flexWrap: "nowrap",
  },
  font: {
    fontSize: 10,
  },
}));
export default function Query(props) {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <div className={classes.queryContainer}>
        <div>new question:</div>
      </div>

      <div className={classes.students}>
        <Button variant="contained">True/False</Button>
      </div>
    </div>
  );
}
