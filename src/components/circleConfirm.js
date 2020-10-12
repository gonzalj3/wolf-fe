import React from "react";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Check from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  circle: {
    //visibility: "hidden",

    position: "absolute",
    top: -17,
    left: 0,
    color: "green",
    //backgroundColor: "white",
    borderRadius: "50%",
    //border: "1px solid transparent",
  },
  check: {
    //visibility: "hidden",
    position: "absolute",
    top: -12,
    left: 5,
    color: "green",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  uncheck: {
    visibility: "hidden",
    position: "absolute",
    top: -12,
    left: 5,
    color: "green",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  checkIconContainer: {
    position: "relative",
    //backgroundColor: "white",
    /*length: "200px",
        width: "200px",*/
  },
}));

export default function CircleConfirm(props) {
  console.log(props);
  function Checkuncheck(props) {
    console.log("inside checkuncheck", props);
    props = props.props;
    if (props.title == props.selection && props.title != undefined) {
      console.log("we are checking", props.title, props.selection);
      return <Check className={classes.check}></Check>;
    } else {
      console.log("we are not checking", props.title, props.selection);

      return <Check className={classes.uncheck}></Check>;
    }
  }
  const classes = useStyles();
  return (
    <div className={classes.checkIconContainer}>
      <Checkuncheck props={props}></Checkuncheck>
      <RadioButtonUncheckedIcon
        fontSize={"large"}
        className={classes.circle}
      ></RadioButtonUncheckedIcon>
    </div>
  );
}
