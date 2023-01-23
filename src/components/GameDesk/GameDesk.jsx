import React, { useState } from 'react'
import classes from './GameDesk.module.css';
import blackcircle from './pictures/blackcircle.png';
import whitecircle from './pictures/whitecircle.png';
import Header from "../Header/Header";
import { centrifuge } from '../../Centr';
import BlackCircle from './pieces/BlackCircle';
import WhiteCircle from './pieces/WhiteCircle';
import Board from './components/board';
import { NavLink } from 'react-router-dom';

function Subscribe(game){
    const sub = centrifuge.newSubscription('game_' + game);
    sub.subscribe();
    return sub;
}

const GameDesk = (props) => {

    const [player, setPlayer] = useState(1);
    const [status, setStatus] = useState('');
    const [turn, setTurn] = useState('black');
    const [i, setI] = useState();

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
                    setStatus('Вы победили!');
                    setI(1);

                } else {
                    setStatus('Вы проиграли');
                    setI(1);
                }   
                //window.location.assign('/LK');
            }
            if (event.event_type == 'game_ended_in_draw') {
                setStatus('Ничья!');
                setI(1);
            }
        });
        sub.on('subscribed', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
        sub.on('error', function (ctx) {
            console.log(ctx); // в ctx будут лежат данные события
        });
    }
 
    const GoToLK = () =>{
        if (i == 1){
            return(
                <NavLink to='/LK'>
                    Перейти в Личный кабинет
                </NavLink>
            )
        }
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
                        <center>Ход
                        <div className={classes.playerturnbox} style={{ backgroundColor: turn }}>
                        </div></center>
                    </div>   
                    <div className={classes.status}>
                        {status}
                    </div>
                    <div className={classes.knopka}>
                        <GoToLK />
                    </div>

                </div>
                <div className={classes.a}>
                    <p className={classes.b}>
                        15
                    </p>
                    <p className={classes.b}>
                        14
                    </p>
                    <p className={classes.b}>
                        13
                    </p>
                    <p className={classes.b}>
                        12
                    </p>
                    <p className={classes.b}>
                        11
                    </p>
                    <p className={classes.b}>
                        10
                    </p>
                    <p className={classes.b}>
                        9
                    </p>
                    <p className={classes.b}>
                        8
                    </p>
                    <p className={classes.b}>
                        7
                    </p>
                    <p className={classes.b}>
                        6
                    </p>
                    <p className={classes.b}>
                        5
                    </p>
                    <p className={classes.b}>
                        4
                    </p>
                    <p className={classes.b}>
                        3
                    </p>
                    <p className={classes.b}>
                        2
                    </p>
                    <p className={classes.b}>
                        1
                    </p>
                </div>
                <div className={classes.desk}>
                    <Board
                        squares={props.squares}
                        onClick={(i) => handleClick(i)}
                    />
                    <a className={classes.abc}>
                       a  
                    </a>
                    <a className={classes.abc}>
                        b 
                    </a>
                    <a className={classes.abc}>
                        c
                    </a>
                    <a className={classes.abc}>
                        d
                    </a>
                    <a className={classes.abc}>
                        e
                    </a>
                    <a className={classes.abc}>
                        f
                    </a>
                    <a className={classes.abc}>
                        g
                    </a>
                    <a className={classes.abc}>
                        h
                    </a>
                    <a className={classes.abc}>
                        i
                    </a>
                    <a className={classes.abc}>
                        j
                    </a>
                    <a className={classes.abc}>
                        k
                    </a>
                    <a className={classes.abc}>
                        l
                    </a>
                    <a className={classes.abc}>
                        m
                    </a>
                    <a className={classes.abc}>
                        n
                    </a>
                    <a className={classes.abc}>
                        o
                    </a>
                    
                </div>

            </div>
        </>
    )
}

export default GameDesk;