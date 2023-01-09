import React from 'react';

import classes from '../Board.module.css';

export default function Square(props) {

  return (
    <button className={classes.square}
      onClick={props.onClick}
      style={props.style}
      key={props.keyVal}
    >

    </button>
  );

}
