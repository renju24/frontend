import Piece from './piece';
import whitecircle from '../pictures/whitecircle.png';


export default class WhiteCircle extends Piece {
  constructor(player){
    super(player, (whitecircle));
  }

  isMovePossible(){
    return(false);
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */
  getSrcToDestPath(src, dest){
    return [];
  }
}

