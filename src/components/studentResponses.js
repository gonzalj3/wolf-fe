import React, { useContext, useEffect, useState } from "react";
import { GameInfoContext } from "../context/GameInfoContext.js";
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "50px",
  },
  table: {
    border: "solid 1px black",
    borderCollapse: "collapse",
  },
}));

export default function StudentResponse() {
  const classes = useStyle();
  const gameInfo = useContext(GameInfoContext);

  console.log("gameInfo : ", gameInfo);

  if (gameInfo.isTeacher && gameInfo.responses) {
    return (
      <div className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table aria-label="student response table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">
                  Answer
                  {`(${gameInfo.responses.length}/${
                    Object.values(gameInfo.gameState.students).length
                  })`}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameInfo.responses.map((student) => (
                <TableRow key={`${student.name}${student.team}`}>
                  <TableCell
                    key={`${student.name}`}
                    component="th"
                    scope="row"
                  >{`${student.name}`}</TableCell>
                  <TableCell
                    key={`${student.team}`}
                  >{`${student.team}`}</TableCell>
                  <TableCell
                    key={`${student.response}`}
                    align="right"
                  >{`${student.response}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div></div>;
  }
}
