import React, { useState } from 'react'
import classes from './GameDesk.module.css';
import blackcircle from './pictures/blackcircle.png';
import whitecircle from './pictures/whitecircle.png';
import Header from "../Header/Header";
import { centrifuge } from '../../Centr';

import initialiseChessBoard from './helpers/board-initialiser';
import BlackCircle from './pieces/BlackCircle';
import WhiteCircle from './pieces/WhiteCircle';
import Board from './components/board';


function Subscribe(game){
    const sub = centrifuge.newSubscription('game_' + game);
    sub.subscribe();
    return sub;
}


const GameDesk = (props) => {

    const [player, setPlayer] = useState(1);
    const [status, setStatus] = useState();
    const [turn, setTurn] = useState('black');

    function Moving(x, y) {
        var i = x * 15 + y;
        if (player == 1) {
            props.squares[i] = new BlackCircle(player);
        }
        else {
            props.squares[i] = new WhiteCircle(player);
        }
        if (player == 1) setPlayer(2);
        else setPlayer(1);
        if (turn == 'black') setTurn('white');
        else setTurn('black')
    }

    const handleClick = (i) => {
        props.squares[i].isMovePossible(i);
    }

    const [game, setGame] = useState();
    const [color, setColor] = useState();
    const [opponent, setOpponent] = useState();
         
    const [sub, setSub] = useState();
    
    props.centrifuge.rpc("is_playing", { "username": props.user.username })
        .then(function (res) {
            setGame(res.data.game.game_id);
            setColor(res.data.game.color);
            setOpponent(res.data.game.opponent);
            if (!sub){
                setSub(Subscribe(res.data.game.game_id));
            }
            
        }, function (err) {
            console.log('rpc error', err);
        });

    if (sub) {
        sub.on('publication', function (ctx) {
            var event = ctx.data;
            if (event.event_type == 'move') {
                Moving(event.data.x_coordinate, event.data.y_coordinate);
            }
            if (event.event_type == 'game_ended_with_winner') {
                var win = event.data.winner_id;
                if (win == props.user.id) {
                    alert("Вы победили!");
                    window.location.assign('/LK'); 
                } else {
                    alert("Вы проиграли");
                    window.location.assign('/LK')
                }   
            }
            if (event.event_type == 'game_ended_in_draw') {
                alert("Ничья!");
                window.location.assign('/LK'); 
            }
        });
        sub.on('subscribed', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
        sub.on('error', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
    }

    
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
                        <center>Ход</center>
                        <div className={classes.playerturnbox} style={{ backgroundColor: turn }}>
                        </div>
                        <div>
                            {status}
                        </div>
                    </div>
                </div>
                <div >
                    <Board
                        squares={props.squares}
                        onClick={(i) => handleClick(i)}
                    />
                </div>
            </div>
        </>
    )
}

export default GameDesk;