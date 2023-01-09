import React from 'react';

import classes from '../Board.module.css';
import Square from './square.js';

export default class Board extends React.Component {

  renderSquare(i) {
    return <Square
      key={i}
      keyVal={i}
      style={this.props.squares[i] ? this.props.squares[i].style : null}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    const board = [];
    for (let i = 0; i < 15; i++) {
      const squareRows = [];
      for (let j = 0; j < 15; j++) {
        squareRows.push(this.renderSquare((i * 15) + j));
      }
      board.push(<div className={classes.boardrow} key={i}>{squareRows}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}
