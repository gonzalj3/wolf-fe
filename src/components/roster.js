import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  assign: {
    height: "10vh",
  },
  container: {
    width: "1500px",
    height: "14vh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "16px",
    backgroundColor: "gray",
    alignItems: "flex-end",
    marginLeft: "25px",
    marginRight: "25px",
    border: "2px",
    borderStyle: "solid",
    borderColor: "yellow",
  },
  unassigned: {
    border: "2px",
    borderStyle: "solid",
    borderColor: "green",
  },
  students: {
    display: "flex",
    flexDirection: "row",
    border: "2px",
    borderStyle: "solid",
    borderColor: "green",
  },
  card: {
    height: "7vh",
    width: "7vh",

    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  cardContent: {
    margin: "0px",
    padding: "0px",
  },
  font: {
    fontSize: 10,
  },
}));
export default function Roster(props) {
  const classes = useStyle();
  const data = [
    "Jose M Gonzalez",
    "Jose M Gonzalez",
    "Jose M Gonzalez",
    "Jose M Gonzalez",
  ];

  return (
    <div className={classes.container}>
      <div className={classes.unassigned}>
        <Typography>Unassigned:</Typography>
        <Button>Random Assign</Button>
      </div>
      <div className={classes.students}>
        {data.map((item) => (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.font}>{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>Add Team</div>
    </div>
  );
}
