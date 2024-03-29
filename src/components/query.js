import React from "react";
import { makeStyles, Button } from "@material-ui/core";

import Question from "../components/question.js";
const useStyle = makeStyles((theme) => ({
  queryContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "10px",
    backgroundColor: "#F4F6FF",
  },
  setQuestion: {
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
    //width: "100%",
    height: "100%",
    //height: "14vh",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    //marginLeft: "5%",
    flexWrap: "nowrap",
    backgroundColor: "#F4F6FF",
    overflow: "auto",
  },
  font: {
    fontSize: 10,
  },
}));
export default function Query(props) {
  const classes = useStyle();
  const trueFalse = () => {
    //console.log("we have props socket ", props.socket);
    if (props.socket) {
      props.socket.emit("newQuestion", {
        gameCode: props.data.gameCode,
        type: "TF",
      });
    }
  };

  const SetAnswerOrQuery = (props) => {
    if (props && props.data && props.data.question) {
      console.log("the data.question looks like : ", props.data.question);
    }
    if (
      props.data &&
      props.data.question &&
      props.data.question.type != null &&
      !props.data.question.scored
    ) {
      console.log("we have a question : ", props.data.question);
      return (
        <div>
          <div className={classes.setQuestion}> Set Question:</div>
          <Question data={props.data}></Question>
        </div>
      );
    } else {
      console.log("we have no question", props);
      return (
        <div>
          <div className={classes.queryContainer}>
            <div>new question:</div>
          </div>

          <div className={classes.students}>
            <Button variant="contained" onClick={trueFalse}>
              True/False
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <SetAnswerOrQuery data={props.data}></SetAnswerOrQuery>
    </div>
  );
}
