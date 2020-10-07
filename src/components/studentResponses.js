import React, { useContext, useEffect, useState } from "react";
import { GameInfoContext } from "../context/GameInfoContext.js";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "100px",
    border: "solid 1px black",
    borderCollapse: "collapse",
    background: "white",
  },
  table: {
    border: "solid 1px black",
    borderCollapse: "collapse",
  },
}));

const StudentResponse = () => {
  const classes = useStyle();
  const gameInfo = useContext(GameInfoContext);

  const socket = gameInfo.socket;

  let [responses, setResponses] = useState([]);
  useEffect(() => {
    console.log("here is gameInfo: ", gameInfo);
    if (gameInfo.gameState.responses) {
      console.log("we have responses :", gameInfo.gameState.responses);
      setResponses(gameInfo.gameState.responses);
    }
    socket.on("newStudentAnswer", (data) => {
      console.log("from studentResponses new student data  ", data);
      setResponses(data);
    });
  }, responses);
  console.log("from student response : ", gameInfo);
  return (
    <table className={classes.tableContainer}>
      <tr className={classes.table}>
        <th className={classes.table}>Name</th>
        <th className={classes.table}>Team</th>
        <th className={classes.table}>Answer</th>
      </tr>
      {responses.map((student) => (
        <tr>
          <td className={classes.table}>{`${student.name}`}</td>
          <td className={classes.table}>{`${student.team}`}</td>
          <td className={classes.table}>{`${student.response}`}</td>
        </tr>
      ))}
      <tr className={classes.table}>
        <td className={classes.table}>{`.`}</td>
        <td className={classes.table}></td>
        <td className={classes.table}></td>
      </tr>
    </table>
  );
};

export default StudentResponse;
