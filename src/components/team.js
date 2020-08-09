import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Droppable } from "react-beautiful-dnd";
import { red } from "@material-ui/core/colors";
import Student from "../components/student-Card";

const useStyle = makeStyles((theme) => ({
  teamName: {
    borderBottom: "solid black ",
    padding: "10px",
  },
  card: {
    height: "50vh",
    width: "220px",
    marginBottom: "10px",
    marginRight: "25px",
    borderRadius: "8px",
  },
  studentCard: {
    height: "26vh",
    width: "220px",
    marginBottom: "10px",
    marginRight: "25px",
    borderRadius: "8px",
  },
  cardContent: {
    padding: "0px 0px 0px 0px",
    height: "100%",
  },
  scoreSection: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "solid black ",
    padding: "5px 0px 5px 0px",
    backgroundColor: "white",
    height: "95px",
  },
  scoreSectionStudent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: "solid black ",
    padding: "5px 0px 5px 0px",
    backgroundColor: "white",
    height: "95px",
  },
  arrowSections: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px 0px 5px",
    fontSize: "large",
  },
  count: {
    padding: "10px 0% 10px 30%",
    fontSize: "75px",
  },
  countStudent: {
    //padding: "10px 40% 10px 50%",
    fontSize: "75px",
  },
  arrows: { fontSize: "60px", padding: "0px" },
  teamCollection: {
    minHeight: "150px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
}));
function StudentSection(props) {
  const classes = useStyle();

  const isTeacher = props.isTeacher;
  if (isTeacher) {
    return (
      <Droppable droppableId={props.id} direction="horizontal">
        {(provided) => (
          <div
            className={classes.teamCollection}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.rosterList.map((number, index) => {
              const student = props.students[number];

              return (
                <Student key={student.id} student={student} index={index} />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  } else {
    return null;
  }
}

export default function Team(props) {
  const classes = useStyle();
  if (props.isTeacher) {
    return (
      <div>
        <Card className={classes.card} style={{ backgroundColor: props.color }}>
          <CardContent className={classes.cardContent}>
            <div className={classes.teamName}>
              <Typography>{props.name}</Typography>
            </div>
            <div className={classes.scoreSection}>
              <div className={classes.count}>{props.score}</div>
              <div className={classes.arrowSections}>
                <ArrowDropUpIcon className={classes.arrows}></ArrowDropUpIcon>
                <ArrowDropDownIcon
                  className={classes.arrows}
                ></ArrowDropDownIcon>
              </div>{" "}
            </div>
            <StudentSection
              id={props.id}
              students={props.students}
              isTeacher={props.isTeacher}
              rosterList={props.rosterList}
            ></StudentSection>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Card
          className={classes.studentCard}
          style={{ backgroundColor: props.color }}
        >
          <CardContent className={classes.cardContent}>
            <div className={classes.teamName}>
              <Typography>{props.name}</Typography>
            </div>
            <div className={classes.scoreSectionStudent}>
              <div className={classes.countStudent}>{props.score}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
