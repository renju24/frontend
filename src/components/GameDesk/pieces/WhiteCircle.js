import Piece from './piece';
import whitecircle from '../pictures/whitecircleonboard.png';


export default class WhiteCircle extends Piece {
  constructor(){
    super((whitecircle));
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

}

