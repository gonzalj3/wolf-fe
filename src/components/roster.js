import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Student from "../components/student-Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import initialData from "../data/initial-data";

const useStyle = makeStyles((theme) => ({
  assign: {
    height: "5vh",
  },
  container: {
    height: "95px",
    flexDirection: "row",
  },
  dropInner: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    padding: "8px",
    overflow: "scroll",
  },
  unassigned: {
    borderRight: "solid 1px black",
    padding: "4px",
    backgroundColor: "#D3D3D3",
  },
  students: {
    display: "flex",
    flexDirection: "row",
    height: "85px",
    backgroundColor: "White",
  },
  card: {
    height: "7vh",
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
export default function Roster({ rosterList }) {
  const classes = useStyle();
  //Random button removed. 
  return (
      <Card className={classes.students}>
        <div className={classes.unassigned}>
          <Typography>Unassigned</Typography>
        </div>
        <Droppable
          droppableId={rosterList.droppable.roster.id}
          direction="horizontal"
        >
          {(provided) => (
            <div
              className={classes.dropInner}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {rosterList.droppable.roster.students.map((number, index) => {
                const student = rosterList.students[number];
                return (
                  <Student key={student.id} student={student} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
  );
}
