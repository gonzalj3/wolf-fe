import React, { useState, useContext } from "react";
import { Card, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CircleConfirm from "./circleConfirm.js";
import { GameInfoContext } from "../context/GameInfoContext.js";
import CorrectAnswer from "../components/correctAnswer.js";
import StudentResponse from "../components/studentResponses.js";
import StudentWaitBox from "../components/studentWait.js"

const useStyles = makeStyles((theme) => ({
  waitContainer: {
    display: "flex",
    marginLeft: "23vw",
    marginTop: "15vh"
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "20px",
    marginLeft: "10vw",
    marginRight: "10vw",
    backgroundColor: "#FAFAFA",
    height: "100%",
    flexShrink: 0,
  },
  teacherButtonsContainer: {
    display: "flex",
    width: "100%",
  },
  responseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //pointerEvents: "none",
    //padding: "10px",
  },
  responseContainerBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    pointerEvents: "none",
  },
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "25%",
  },
  result: {
    width: "50%",
  },
  answerButton: {
    //Bug below, cant get "primary" from theme to work here.
    background: "#F8B941",
    margin: "2vw",
    width: "100%",
    fontFamily: "Jaldi",
    fontSize: "2.5vw",
    "&:hover": {
      background: "#dfa73b",
    },
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const [lock, setLock] = useState(false);
  const gameInfo = useContext(GameInfoContext);
  const [isShown, setIsShown] = useState(false);

  //const [circle, setCircle] = useState("false");
  //const question = ;
  //const data = props;
  const socket = gameInfo.socket;
  console.log("our socket in question is : ", socket)

  const cancelQuestion = (event) => {
    console.log(" the question index is : ", props.data.question.index);
    let data = {
      gameCode: sessionStorage.getItem("gameCode"),
      index: props.data.question.index,
    };
    gameInfo.socket.emit("cancelQuestion", data);
    window.location.reload();
  };

  const awardPoints = (event) => {
    if (answer != "") {
      let data = {
        gameCode: sessionStorage.getItem("gameCode"),
        index: props.data.question.index,
        answer: answer,
      };
      console.log("the data we are sending on award Points : ", data);
      gameInfo.socket.emit("awardPoints", data);
      
      window.location.reload();
    }
  };

  const relayAnswer = (event) => {
    //Take the answer that has a check on it and send it through websockets.
    if (answer != "") {
      console.log("sending answer as: ", answer);
      if (gameInfo) {
        let data = {
          gameCode: sessionStorage.getItem("gameCode"),
          type: "TF",
          answer: answer,
        };
        console.log("sending: ", data);
        if (gameInfo.isTeacher) {
          gameInfo.socket.emit("setAnswer", data);
          //sessionStorage.setItem("teacherAnswer", answer)
          //We are going to move the reload point to when the teacher clicks on award point
          //window.location.reload();
        } else {
          data.student = gameInfo.student;
          gameInfo.socket.emit("studentAnswer", data);
          setLock(true);
        }
      }
    }
  };

  const selectAnswer = (event) => {
    if (!lock) {
      setAnswer(event.currentTarget.value);
    }
  };

  const TeacherButtons = () => {
    if (gameInfo.isTeacher) {
      return (
        <div className={classes.teacherButtonsContainer}>
          <Button variant={"contained"} className={classes.answerButton} onClick={relayAnswer}>
            Stop Accepting Answers
          </Button>
          <Button variant={"contained"} className={classes.answerButton} onClick={awardPoints}>
            Award Points
          </Button>
          <Button variant={"contained"} className={classes.answerButton} onClick={cancelQuestion}>
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <Button variant={"contained"} className={classes.answerButton} onClick={relayAnswer}>
          Submit
        </Button>
      );
    }
  };

  /*let PresentResults = () => {
    if (gameInfo.isTeacher) {
      return ;
    } else {
      return <div></div>;
    }
  };*/

  function AvailableQuestion(props) {
    const question = props.data.data;

    if (question) {
      console.log("this is question", question);
      if (question.question) {
        console.log("type", question.question.type);
      }
    }
    if (question && question.question && question.question.type == "TF" && !question.question.scored) {
      return (
        <div>
          <Card className={classes.questionContainer}>
            <div
              className={
                question.question.answer && !gameInfo.isTeacher
                  ? classes.responseContainerBlock
                  : classes.responseContainer
              }
            >
              <Button
                className={classes.answerButton}
                variant={"contained"}
                value={"true"}
                onClick={selectAnswer}
              >
                True
                <CircleConfirm
                  title={"true"}
                  selection={answer}
                  lock={lock}
                ></CircleConfirm>
              </Button>
              <Button
                className={classes.answerButton}
                variant={"contained"}
                value={"false"}
                onClick={selectAnswer}
              >
                False
                <CircleConfirm
                  title={"false"}
                  selection={answer}
                  lock={lock}
                ></CircleConfirm>
              </Button>
            </div>
            <div className={classes.responseContainer}>
              <TeacherButtons></TeacherButtons>
            </div>
            <StudentResponse></StudentResponse>
           </Card>
        </div>
      );
    } else {
      return <div className={classes.waitContainer}><StudentWaitBox></StudentWaitBox></div>;
    }
  }
  return <AvailableQuestion data={props}></AvailableQuestion>;
}
