import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  assign: {
    height: "10vh",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "6px",
    backgroundColor: "gray",
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
    <div>
      <div className={classes.assign}></div>
      <div className={classes.container}>
        {data.map((item) => (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
