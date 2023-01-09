import React, { useState } from 'react'
import classes from './GameDesk.module.css';
import blackcircle from './pictures/blackcircle.png';
import whitecircle from './pictures/whitecircle.png';
import Header from "../Header/Header";

import Board from './components/board';
import BlackCircle from './pieces/BlackCircle';
import WhiteCircle from './pieces/WhiteCircle';
import initialiseChessBoard from './helpers/board-initialiser.js';

import centrifuge from '../Centr';
import Game from './components/game';

/*
export const isMovePossible = (x) => {
    const [user, setUser] = useState();
    const [game, setGame] = useState();
    
    centrifuge.on('connected', function (ctx) {
        console.log('connected true');
        setUser(ctx.data.username);
    });
    centrifuge.rpc("is_playing", { "username": user })
        .then(function (res) {
            setGame(res.data.game.game_id);
        }, function (err) {
            console.log('rpc error', err);
        });
    centrifuge.rpc("make_move", { "game_id": game, "x_coordinate": x, "y_coordinate": 0 })
        .then(function (res) {
            return(true);
        }, function (err) {
            alert(err.massage);
        });
}
*/

const GameDesk = () => {

    const [user, setUser] = useState();
    const [game, setGame] = useState();
    const [color, setColor] = useState();
    const [opponent, setOpponent] = useState();


    centrifuge.on('connected', function (ctx) {
        console.log('connected true');
        setUser(ctx.data.username);
    });
    centrifuge.rpc("is_playing", { "username": user })
        .then(function (res) {
            setGame(res.data.game.game_id);
            setColor(res.data.game.color);
            setOpponent(res.data.game.opponent);
        }, function (err) {
            console.log('rpc error', err);
        });


    centrifuge.on('connected', function (ctx) {
        const sub = centrifuge.newSubscription('game_' + game);

        sub.subscribe();

        sub.on('publication', function (ctx) {
            var event = ctx.data;
            console.log(ctx.data);
            if (event.event_type == 'move') {
                //move
            }
            if (event.event_type == 'game_ended_with_winner') {
                alert('Вы победили!');
/**********************************************проверит адрес******************************************* */
                window.location.assign('/LK/'); //поменять адрес
            }
            if (event.event_type == 'game_ended_in_draw') {
                alert('Вы проиграли');
/**********************************************проверит адрес******************************************* */
                window.location.assign('/LK/'); //поменять адрес
            }
        });
        sub.on('subscribed', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
        sub.on('error', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
    });

    



    return (
        <>
            <Header />
            <div className={classes.box}>
                <div className={classes.players}>
                    <div className={classes.player1}><central>
                        <img src={color == 'black' ? blackcircle : whitecircle} />
                        <central><div className={classes.textT1}>
                        </div></central>
                        <a className={classes.textT1}>
                            {user}
                        </a>
                    </central></div>
                    <div className={classes.VS}>
                        VS
                    </div>
                    <div className={classes.player2}>
                    <img src={color == 'black' ? whitecircle : blackcircle} />
                        <div className={classes.textT1}><central>
                            {opponent}
                        </central></div>
                    </div>
                    <div className={classes.title}>
                        <central>
                        </central>
                    </div>
                    <div >
                    </div>
                </div>
                <div >
                    <Game />
                </div>
            </div>

        </>


    )
}


export default GameDesk;
