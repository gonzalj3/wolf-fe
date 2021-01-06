import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Droppable } from 'react-beautiful-dnd';
import Student from '../components/student-Card';
import { IconButton } from '@material-ui/core';
import {
  GameInfoContext,
  GameInfoProvider,
} from '../context/GameInfoContext.js';

const useStyle = makeStyles((theme) => ({
  teamBar: {
    height: '2vh',
  },
  teamName: {
    //borderBottom: "solid black ",
    //padding: "10px",
    paddingLeft: '10px',
    //fontFamily: "Jaldi",
    //textSizeAdjust: "50%"
    //fontSize: "5vw"
    background: 'white',
    //color: "white",
    //WebkitTextStroke: "1px rgba(0, 0, 0, .5)",
  },
  card: {
    height: '50vh',
    width: '20vw',
    marginBottom: '10px',
    marginLeft: '2vw',
    borderRadius: '8px',
  },
  studentCard: {
    height: '26vh',
    width: '20vw',
    marginBottom: '10px',
    marginRight: '2vw',
    borderRadius: '8px',
  },
  cardContent: {
    padding: '0px 0px 0px 0px',
    //height: "100%",
  },
  scoreSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    //alignContent:"center",
    //borderBottom: "solid black ",
    //padding: "5px 0px 5px 0px",
    backgroundColor: 'white',
    height: '10vh',
    width: '100%',
  },
  scoreSectionStudent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    //borderBottom: "solid black ",
    padding: '5px 0px 5px 0px',
    backgroundColor: 'white',
    height: '10vh',
  },
  arrowSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1vw',
    //height: "100%"
    /*padding: "0px 0px 0px 5px",
    fontSize: "large",*/
  },
  arrowButton: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 0px 0px 0px',
    width: '3vw',
    height: '2vw',
    '& .MuiIconButton-label': {
      pointerEvents: 'none',
    },
  },
  count: {
    fontSize: '5vh',
  },
  countStudent: {
    fontSize: '5vh',
  },
  arrows: { color: 'black', fontSize: '8vw', padding: '0px' },
  teamCollection: {
    height: '40vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'baseline',
    '&:hover': {
      overflow: 'scroll',
    },
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
              //changed below from number to number.id

              const student = props.students[number.id];

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
  const gameInfo = useContext(GameInfoContext);
  const [score, setScore] = useState(props.score);
  const socket = gameInfo.socket;
  console.log('our socket in team is : ', socket);
  /*useEffect(() => {
    socket.on("teamPoint", (data) => {
      console.log("got a point : ", data);
      if (data.team == props.id) {
        console.log("score : ", data.score);
        setScore(data.score);
      }
    });
  }, [score]);*/

  function addPoint() {
    let data = {
      team: props.id,
      gameCode: props.gameCode,
      point: 1,
    };
    setScore(score + 1);
    console.log('about to change points, data : ', data);

    socket.emit('pointChangeTeam', data);
  }

  function subtractPoint() {
    let data = {
      team: props.id,
      gameCode: props.gameCode,
      point: -1,
    };
    setScore(score - 1);
    console.log('about to change points, data : ', data);

    socket.emit('pointChangeTeam', data);
  }

  if (props.isTeacher) {
    return (
      <div>
        <Card className={classes.card} style={{ backgroundColor: props.color }}>
          <CardContent className={classes.cardContent}>
            <div className={classes.teamBar}></div>

            <div className={classes.teamName}>
              <Typography>{props.name}</Typography>
            </div>
            <div className={classes.scoreSection}>
              <div className={classes.count}>{score}</div>
              <div className={classes.arrowSections}>
                <IconButton onClick={addPoint} className={classes.arrowButton}>
                  <ArrowDropUpIcon className={classes.arrows}></ArrowDropUpIcon>
                </IconButton>
                <IconButton
                  onClick={subtractPoint}
                  className={classes.arrowButton}
                >
                  <ArrowDropDownIcon
                    className={classes.arrows}
                  ></ArrowDropDownIcon>
                </IconButton>
              </div>
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
            <div className={classes.teamBar}></div>
            <div className={classes.teamName}>{`${props.name}`}</div>
            <div className={classes.scoreSectionStudent}>
              <div className={classes.countStudent}>{score}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
