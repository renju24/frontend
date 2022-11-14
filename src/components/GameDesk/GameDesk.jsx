import React from "react";
import classes from './GameDesk.module.css';

import blackcircle from './pictures/blackcircle.png';
import whitecircle from './pictures/whitecircle.png';
import desk from './pictures/desk.png';
import Header from "../Header/Header";

const PlayerOne = (props) =>{

}

const PlayerTwo = (props) =>{
    
}


const GameDesk = () => {
    return (
        <><Header />
        <div className={classes.box}>
            <div className={classes.players}>
                <div className={classes.player1}><central>
                    <img src={blackcircle} />
                    <central><div className={classes.textT1}>
                        <PlayerOne></PlayerOne>
                    </div></central>
                    <a className={classes.textT1}>
                        (Вы)
                    </a>

                </central></div>
                <div className={classes.VS}>
                    VS
                </div>
                <div className={classes.player2}>
                    <img src={whitecircle} />
                    <div className={classes.textT1}><central>
                        Name2
                    </central></div>
                </div>
                <div className={classes.title}>
                    <central>
                        Чей ход
                    </central>
                </div>

            </div>
            <div className={classes.desk}>
                <img src={desk} />
            </div>
        </div></>
    )
}

export default GameDesk;