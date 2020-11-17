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
    //marginLeft: "24vw",
    marginTop: "5vh",
    //margin: "auto"
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "20px",
    marginLeft: "3vw",
    marginRight: "3vw",
    //marginBottom: "10vh",
    backgroundColor: "#FAFAFA",
    //height: "100%",
    //flexShrink: 0,
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
    margin: "1vw",
    width: "100%",
    height:"100%",
    fontFamily: "Jaldi",
    fontSize: "1.8vh",
    "&:hover": {
      background: "#dfa73b",
      //fontSize: "1.6vh",
      //height:"50%",
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
    //removed answer requirement to stop getting student answers
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
          let data = {
            gameCode: sessionStorage.getItem("gameCode"),
            type: "TF",
            //answer: answer,
          };
          gameInfo.socket.emit("setAnswer", data);
        } else {
          data.student = gameInfo.student;
          gameInfo.socket.emit("studentAnswer", data);
          setLock(true);
        }
        
      }
    } else {
      if(gameInfo){
        if (gameInfo.isTeacher) {
          let data = {
            gameCode: sessionStorage.getItem("gameCode"),
            type: "TF",
            //answer: answer,
          };
          gameInfo.socket.emit("setAnswer", data);
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
    console.log("question", question)
    if(!question ){
      return <div className={classes.waitContainer}><StudentWaitBox></StudentWaitBox></div>;
    }

    console.log("question last action:", question.lastAction)
    switch(question.lastAction){
      case 'new':
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
        break;
      case 'cancel':
        console.log("question in cancel")

        return <div className={classes.waitContainer} ><StudentWaitBox message="Stay Ready ..."></StudentWaitBox></div>;
        break;
      case 'stop':
        console.log("question in stop")
        return <div className={classes.waitContainer} ><StudentWaitBox message="Paused ..."></StudentWaitBox></div>;
        break;
      case 'point':
        let messageAnswer = ""
        if(!answer){
        return <div className={classes.waitContainer} ><StudentWaitBox message="Stay Ready ..."></StudentWaitBox></div>;
        }
        if(answer === question.question.answer){
          messageAnswer = "    Correct!"
        } else {
          messageAnswer = "   Incorrect"
        }
        return <div className={classes.waitContainer}><StudentWaitBox message={messageAnswer} ></StudentWaitBox></div>;
        break;
    }
  }
  return <AvailableQuestion data={props}></AvailableQuestion>;
}
