import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const useStyle = makeStyles((theme) => ({
  teamName: {
    borderBottom: "solid black ",
    padding: "10px",
  },
  card: {
    height: "40vh",
    width: "220px",
    marginBottom: "10px",
    marginRight: "25px",
    borderRadius: "8px",
    borderColor: "#759CFC",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  cardContent: {
    padding: "0px 0px 0px 0px",
  },
  scoreSection: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "solid black ",
    padding: "0px 0px 0px 0px",
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
  arrows: { fontSize: "60px", padding: "0px" },
}));

export default function Team(props) {
  const classes = useStyle();
  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.teamName}>
            <Typography>{props.name}</Typography>
          </div>
          <div className={classes.scoreSection}>
            <div className={classes.count}>{props.score}</div>
            <div className={classes.arrowSections}>
              <ArrowDropUpIcon className={classes.arrows}></ArrowDropUpIcon>
              <ArrowDropDownIcon className={classes.arrows}></ArrowDropDownIcon>
            </div>
          </div>

          <div>names</div>
        </CardContent>
      </Card>
    </div>
  );
}
