import React from 'react';
import '../Board.module.css';
import Board from './board.js';
import BlackCircle from '../pieces/BlackCircle';
import WhiteCircle from '../pieces/WhiteCircle';
import initialiseChessBoard from '../helpers/board-initialiser.js';

  
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      player: 1,
      status: '',
      turn: 'black'
    }
  }



  handleClick(i) {
    const squares = [...this.state.squares];

    const move = squares[i].isMovePossible;
    
    if (move) {
      if (this.state.player === 1) {
        squares[i] = new BlackCircle(this.state.player);
      }
      else {
        squares[i] = new WhiteCircle(this.state.player);
      }
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
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>
            </div>
            <div className="game-status">{this.state.status}</div>
          </div>
        </div>
      </div>
    );
  }
}

