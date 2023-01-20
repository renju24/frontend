import Piece from './piece';
import blackcircle from '../pictures/blackcircleonboard.png';

export default class BlackCircle extends Piece {
  constructor(){
    super((blackcircle));
  }

  isMovePossible(i){
    return(false);
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */
}