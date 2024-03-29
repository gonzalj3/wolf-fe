import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import Emoji from "./emoji.js";

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    width: "6vw",
    height: "6vh",
    minHeight: "9vh",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    [theme.breakpoints.up("sm")]: {
      height: "9vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "5vh",
      width: "10vw",
    },
  },
  card: {
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
    marginLeft: "5px",
    marginTop: "3px",
    padding: "2px",
    fontSize: 12,
    wordBreak: "break-word",

    gridArea: "1 / 1 / 3 / 3",
  },

  hand: {
    gridArea: " 1 / 1 / 3 / 3 ",
    marginLeft: "3.75vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4.5vw",
    },
  },
}));

export default function Student({ student, index }) {
  const classes = useStyle();
  console.log("the student looks like : ", student);
  return (
    <Draggable draggableId={student.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={classes.cardContainer}>
            <Card className={classes.card}>{student.name}</Card>
            {student.hand ? (
              <div className={classes.hand}>
                <Emoji symbol="✋" label="hand" gray={false}></Emoji>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Draggable>
  );
}
