import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gray: {
    filter: 'grayscale(100%)',
    fontSize: '25px',
  },
  color: {
    fontSize: '25px',
  },
}));

function Emoji(props) {
  const classes = useStyles();
  console.log(' is gray : ', props.gray);
  return (
    <span
      className={props.gray ? classes.gray : classes.color}
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  );
}

export default Emoji;
