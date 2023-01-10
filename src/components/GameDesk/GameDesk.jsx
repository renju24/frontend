import React, { useState } from 'react'
import classes from './GameDesk.module.css';
import blackcircle from './pictures/blackcircle.png';
import whitecircle from './pictures/whitecircle.png';
import Header from "../Header/Header";

import Game from './components/game';

const GameDesk = (props) => {

    const [game, setGame] = useState();
    const [color, setColor] = useState();
    const [opponent, setOpponent] = useState();

    const move =  new Game();

    props.centrifuge.rpc("is_playing", { "username": props.user.username })
        .then(function (res) {
            setGame(res.data.game.game_id);
            setColor(res.data.game.color);
            setOpponent(res.data.game.opponent);
        }, function (err) {
            console.log('rpc error', err);
        });

    move.Moving(2, 0, 0);
        
    
    const sub = props.centrifuge.newSubscription('game_' + game);
    //sub.unsubscribe();
    sub.subscribe();

    sub.on('publication', function (ctx) {
        var event = ctx.data;
        console.log(ctx.data);
        if (event.event_type == 'move') {
            move.Moving(event.data.user_id, event.data.x_coordinate, event.data.y_coordinate);
        }
        if (event.event_type == 'game_ended_with_winner') {
            var win = event.data.winner_id;
            if (win == props.user.id) {
                alert("Вы победили!");
            } else {
                alert("Вы проиграли");
            }
            //**********************************************проверит адрес*******************************************
            window.location.assign('/LK/'); //поменять адрес
        }
        if (event.event_type == 'game_ended_in_draw') {
            alert("Ничья!");
            //**********************************************проверит адрес*******************************************
            window.location.assign('/LK/'); //поменять адрес
        }
    });
    sub.on('subscribed', function (ctx) {
        console.log(ctx); // в ctx будут лежат данные события
    });
    sub.on('error', function (ctx) {
        console.log(ctx); // в ctx будут лежат данные события
    });
    

    return (
        <>
            <Header />
            <div className={classes.box}>
                <div className={classes.players}>
                    <div className={classes.player1}><central>
                        <div>
                        <img src={color == 'black' ? blackcircle : whitecircle} />                            
                        </div>
                        <central><div className={classes.textT1}>
                        </div></central>
                        <a className={classes.textT1}>
                            {props.user.username}
                        </a>
                    </central></div>
                    <div className={classes.VS}>
                        VS
                    </div>
                    <div className={classes.player2}>
                        <div>
                    <img src={color == 'black' ? whitecircle : blackcircle} />                            
                        </div>
                        <div className={classes.textT1}><central>
                            {opponent}
                        </central></div>
                    </div>
                    <div className={classes.title}>

                    </div>

                </div>
                <div >
                    <Game corol={color}/>
                </div>
            </div>

        </>


    )
}


export default GameDesk;