import NoCircle from "../pieces/NoCircle";
import BlackCircle from '../pieces/BlackCircle';
import WhiteCircle from '../pieces/WhiteCircle';

export default function initialiseChessBoard() {
  const squares = Array(225).fill(null);

    for (let i = 0; i < 225; i++){
      squares[i] = new NoCircle(1);
    }

  return squares;
}