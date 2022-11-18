import React from "react";
import classes from './Board.module.css';

// var tbl = document.getElementsByTagName("table")[0];
// var cls = tbl.getElementsByTagName("td");

// function alertRowCell(e){
//   var cell = e.target || window.event.srcElement;
//   alert( cell.cellIndex + ' : ' + cell.parentNode.rowIndex );
//   //функция которая отправит на сервер координаты (cell.cellIndex, cell.parentNode.rowIndex)
//   //и тут наверно отработать этот клик: можно/нельзя и какую фигурку
//   document.getElementById("15").className = classes.blackcircle;
// }

// for ( var i = 0; i < cls.length; i++ ) {
//   if ( cls[i].addEventListener ) {
//     cls[i].addEventListener("click", alertRowCell, false);
//   } else if ( cls[i].attachEvent ) {
//     cls[i].attachEvent("onclick", alertRowCell);
//   }
// }

let selectedID = React.createRef;

let addCircle = (e) => {
    e.preventDefault();
    let text =selectedID.current.value;
    alert(text);
}

const Board = () => {
    return (
        <table onClick={addCircle}>
            <tr>
                <td ref={selectedID} id='0'></td><td id="1"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td id="15"className={classes.whitecircle}></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td className={classes.blackcircle}></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>

        </table>
    )
}

export default Board;



