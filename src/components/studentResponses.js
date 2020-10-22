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

export default function StudentResponse(){
  const classes = useStyle();
  const gameInfo = useContext(GameInfoContext);

  console.log("gameInfo : ", gameInfo)

  if(gameInfo.isTeacher && gameInfo.responses) {
    return (
      <table className={classes.tableContainer}>
        <tbody>
        <tr className={classes.table}>
          <th key={""}className={classes.table}>Name</th>
          <th className={classes.table}>Team</th>
          <th className={classes.table}>Answer</th>
        </tr>
        {gameInfo.responses.map((student) => (
          <tr key={`${student.name}${student.team}`}>
            <td key={`${student.name}`} className={classes.table}>{`${student.name}`}</td>
            <td key={`${student.team}`}className={classes.table}>{`${student.team}`}</td>
            <td key={`${student.response}`}className={classes.table}>{`${student.response}`}</td>
          </tr>
        ))}
        <tr className={classes.table}>
          <td className={classes.table}>{`.`}</td>
          <td className={classes.table}></td>
          <td className={classes.table}></td>
        </tr>
        </tbody>
      </table>
    );
  } else {
    return <div></div>
  }

};

