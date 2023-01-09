import Piece from './piece';
import cell from '../pictures/cell.png';

export default class NoCircle extends Piece {
  constructor(player){
    super(player, (cell));
  }

  isMovePossible(){
    return(true);
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