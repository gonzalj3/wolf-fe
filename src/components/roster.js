import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  assign: {
    height: "5vh",
  },
  container: {
    width: "1500px",
    height: "75px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "0px",
    alignItems: "center",
    marginLeft: "25px",
    marginRight: "25px",
  },
  unassigned: {
    borderRight: "solid 1px black",
    padding: "4px",
    backgroundColor: "#D3D3D3",
  },
  students: {
    display: "flex",
    flexDirection: "row",
    //width: "100%",
    //height: "100%",
    height: "75px",
    flexGrow: "2",
    border: "solid 1px black",
    backgroundColor: "White",
  },
  card: {
    height: "7vh",
    width: "7vh",
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
    marginLeft: "5px",
    marginTop: "3px",
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
      <div className={classes.students}>
        <div className={classes.unassigned}>
          <Typography>Unassigned:</Typography>
          <Button variant="contained">Random Assign</Button>
        </div>
        {data.map((item) => (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.font}>{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button variant="contained" style={{ marginLeft: "5px" }}>
        Add Team
      </Button>
    </div>
  );
}
