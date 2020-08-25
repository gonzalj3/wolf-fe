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

  const trueFalse = () => {
    //console.log("we have props socket ", props.socket);
    if (props.socket) {
      props.socket.emit("newQuestion", {
        gameCode: props.data.gameCode,
        type: "TF",
      });
    }
  };

  const QuestionOptions = (props) => {
    if (props.question.type != null) {
      console.log("we have a question");
    } else {
      console.log("we have no question");
    }
  };

  const SetAnswer = (props) => {
    if (props.question.type != null) {
      console.log("we have a question");
    } else {
      console.log("we have no question");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.queryContainer}>
        <div>new question:</div>
      </div>

      <div className={classes.students}>
        <Button variant="contained" onClick={trueFalse}>
          True/False
        </Button>
      </div>
      <QuestionOptions></QuestionOptions>
      <SetAnswer></SetAnswer>
    </div>
  );
}
