import Piece from './piece';
import blackcircle from '../pictures/blackcircle.png';

export default class BlackCircle extends Piece {
  constructor(player){
    super(player, (blackcircle));
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