import React from 'react';
import Board from './board.js';
import BlackCircle from '../pieces/BlackCircle';
import WhiteCircle from '../pieces/WhiteCircle';
import initialiseChessBoard from '../helpers/board-initialiser.js';

export default class Game extends React.Component {
  constructor(color) {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      player: 1,
      status: '',
      turn: color
    }
  }

  Moving(x, y) {
    const squares = [...this.state.squares];
    var i = x*15 + y;  
    if (this.state.player === 1) {
        squares[i] = new BlackCircle(this.state.player);
      }
      else {
        squares[i] = new WhiteCircle(this.state.player);
      }
    let player = this.state.player === 1 ? 2 : 1;
    let turn = this.state.turn === 'white' ? 'black' : 'white';

    this.setState(oldState => ({
      squares,
      player,
      status: '',
      turn
    }));
  }

  handleClick(i) {
    const squares = [...this.state.squares];
    const move = squares[i].isMovePossible(i);;
    //this.Moving(7, 7);
  }

  render() {

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
      </div>
    );
  }
}

