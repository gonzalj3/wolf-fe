import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  card: {
    height: "9vh",
    width: "9vh",
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
    marginLeft: "5px",
    marginTop: "3px",
    padding: "2px",
    fontSize: 12,
    wordBreak: "break-word",
  },
  cardContent: {
    margin: "0px",
    padding: "0px",
  },
  font: {},
}));

export default function Student({ student, index }) {
  const classes = useStyle();

  return (
    <Draggable draggableId={student.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classes.card}
        >
          {student.name}
        </Card>
      )}
    </Draggable>
  );
}
