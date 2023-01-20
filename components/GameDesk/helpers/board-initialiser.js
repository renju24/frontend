import NoCircle from "../pieces/NoCircle";

export default function initialiseChessBoard() {
  const squares = Array(225).fill(null);

    for (let i = 0; i < 225; i++){
      squares[i] = new  NoCircle(1);
    }

  return squares;
}