import Piece from './piece';
import cell from '../pictures/cell.png';

import {centrifuge, user} from "../../../Centr";

const move = (x, y) => {

    centrifuge.rpc("is_playing", { "username": user.username })
      .then(function (res) {
        centrifuge.rpc("make_move", { "game_id": res.data.game.game_id, "x_coordinate": x, "y_coordinate": y })
          .then(function (res) {
            console.log(res);
          }, function (err) {
            alert(err.message);
          });
      }, function (err) {
        console.log('rpc error', err);
      });

  //return(true);
}


export default class NoCircle extends Piece  {
  constructor(player){
    super(player, (cell));
  }

  isMovePossible(i){
    var x = 0;
    var  y = 0;
    while (i > 15){
        i = i - 15; 
        x = x + 1;
    }
    y = i;
    console.log(x, y);
    move(x, y);
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */

}