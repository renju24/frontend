import React, { useState } from 'react';
import classes from './LK.module.css';
import Header from "../Header/Header";
import face from './pictures/face4.png';
import { sub } from '../../Centr';

const LK = (props) => {

    const [topUser1, setTopUser1] = useState();
    const [topUser1R, setTopUser1R] = useState();
    const [topUser2, setTopUser2] = useState();
    const [topUser2R, setTopUser2R] = useState();
    const [topUser3, setTopUser3] = useState();
    const [topUser3R, setTopUser3R] = useState();
    const [topUser4, setTopUser4] = useState();
    const [topUser4R, setTopUser4R] = useState();
    const [topUser5, setTopUser5] = useState();
    const [topUser5R, setTopUser5R] = useState();

    const [buh1, setBuh1] = useState();
    const [wuh1, setWuh1] = useState();
    const [winuh1, setWinuh1] = useState();
    const [buh2, setBuh2] = useState();
    const [wuh2, setWuh2] = useState();
    const [winuh2, setWinuh2] = useState();
    const [buh3, setBuh3] = useState();
    const [wuh3, setWuh3] = useState();
    const [winuh3, setWinuh3] = useState();

    const [game, setGame] = useState();
    const [game_id, setGame_id] = useState();
    const [inviter, setInviter] = useState();
    const [invited_at, setInvited_at] = useState();
    const [status, setStatus] = useState();
    const [opponent, setOpponent] = useState();

    let user2 = React.createRef();

    if (props.user.id) {
        sub.s.subscribe();

        sub.s.on('error', function (ctx) {
            alert(ctx.message); // в ctx будут лежат данные события
        });

        sub.s.on('publication', function (ctx) {
            var event = ctx.data;
            console.log(ctx.data);
            if (event.event_type == 'game_invitation') {
                setGame_id(event.data.game_id);
                setInviter(event.data.inviter);
                setInvited_at(event.data.invited_at);
                //props.ub.unSubscribe();
                //sub.removeAllListeners();
            }
        });
        props.centrifuge.rpc("is_playing", { "username": props.user.username })
        .then(function (res) {
            setGame(res.data.game.game_id);
            setOpponent(res.data.game.opponent);          
        }, function (err) {
            console.log('rpc error', err);
        });
    }
    
    let NewGame = () => {
        let username = user2.current.value;
        props.centrifuge.rpc("call_for_game", { "username": username })
            .then(function (ctx) {
                setStatus('Ждём ответа игрока');
                setGame_id(ctx.data.game_id);
                const sub2 = props.centrifuge.newSubscription('game_' + ctx.data.game_id);
                sub2.subscribe();
                sub2.on('publication', function (ctx) {
                    var event = ctx.data;
                    if (event.event_type == 'game_started') {
                        sub2.unsubscribe();
                        sub2.removeAllListeners();
                        //console.log('unsubscribe');
                        window.location.assign('/gamedesk/');
                    }
                    if (event.event_type == 'decline_game_invitation') {
                        sub2.unsubscribe();
                        sub2.removeAllListeners();
                        setGame_id('');
                        setStatus('Игрок отказался');
                    }
                });
            }, function (err) {
                setStatus(err.message);
            });
    }

    const [show, setShow] = useState(false);

    let LogOutOut = () =>{
        window.location.assign('https://renju24.com/logout');
    }

    let LogOut = (props) => {
        
        if(!props.show) {
            return null;
        }

        return (<>
            <div className={classes.modal}>
                <center>
                <div className={classes.modalcontent}>
                    <div className={classes.modalbody}>
                        Вы уверены, что хотите выйти из аккаунта?
                    </div>
                        <div className={classes.modalfooter}>
                            <button onClick={LogOutOut} className={classes.buttonY}>
                                Да
                            </button>
                            <button onClick={props.onClose} className={classes.buttonY}>
                                Нет
                            </button>
                        </div>
                </div>
                </center>
            </div>
        </>)
    }

    let NewGame1 = () => {
        props.centrifuge.rpc("accept_game_invitation", { "game_id": game_id })
            .then(function (ctx) {;
                window.location.assign('/gamedesk/');
            }, function (err) {
                alert(err.message);
            });
    }
    let NewGame2 = () => {
        props.centrifuge.rpc("decline_game_invitation", { "game_id": game_id })
            .then(function (ctx) {
                setInviter('');
                setInvited_at('');
            }, function (err) {
                alert(err.message);
            });
    }
    let ContineGame1 = () =>{
        window.location.assign('/gamedesk/');
    }
  
    const Notice_Invite = () => {
        if (inviter) {
            return (
                <>
                    <div>
                        Пользователь {inviter} приглашает Вас в игру!
                    </div>
                    <center>
                    <button onClick={NewGame1} className={classes.buttonY}>
                        Согласиться
                    </button>
                    <button onClick={NewGame2} className={classes.buttonY}>
                        Отказаться
                    </button>
                    </center>
                </>
            )
        }
    }

    const Notice_Play = () => {
        if (game) {
            return (
                <>
                    <div>
                        У Вас незакончена игра с пользователем {opponent}
                    </div>
                    <center>
                    <button onClick={ContineGame1} className={classes.buttonY}>
                        Продолжить
                    </button>                      
                    </center>
                </>
            )
        }
    }

    const HistoryTb = () => {
        if (buh1) {
            return (
                <>
                    <tr>
                        <td>{buh1}</td>
                        <td>{wuh1}</td>
                        <td>{winuh1}</td>
                    </tr>
                    <tr>
                        <td>{buh2}</td>
                        <td>{wuh2}</td>
                        <td>{winuh2}</td>
                    </tr>
                    <tr>
                        <td>{buh3}</td>
                        <td>{wuh3}</td>
                        <td>{winuh3}</td>
                    </tr>
                </>
            )
        }

    }

    props.centrifuge.rpc("game_history", { "username": props.user.username })
        .then(function (ctx) {
            setBuh1(ctx.data.games[0].black_username);
            setWuh1(ctx.data.games[0].white_username);
            setWinuh1(ctx.data.games[0].winner_username);
            setBuh2(ctx.data.games[1].black_username);
            setWuh2(ctx.data.games[1].white_username);
            setWinuh2(ctx.data.games[1].winner_username);
            setBuh3(ctx.data.games[2].black_username);
            setWuh3(ctx.data.games[2].white_username);
            setWinuh3(ctx.data.games[2].winner_username);
        }, function (err) {
            console.log('rpc error', err);
        });

    props.centrifuge.rpc("top_10", {})
        .then(function (ctx) {
            setTopUser1(ctx.data.users[0].username);
            setTopUser1R(ctx.data.users[0].ranking);
            setTopUser2(ctx.data.users[1].username);
            setTopUser2R(ctx.data.users[1].ranking);
            setTopUser3(ctx.data.users[2].username);
            setTopUser3R(ctx.data.users[2].ranking);
            setTopUser4(ctx.data.users[3].username);
            setTopUser4R(ctx.data.users[3].ranking);
            setTopUser5(ctx.data.users[4].username);
            setTopUser5R(ctx.data.users[4].ranking);
        }, function (err) {
            console.log('rpc error', err);
        });

    return (<><Header />
        <div className={classes.conteiner}>
            <div className={classes.history}>
                <center>История игр</center>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Черная сторона</th>
                            <th>Белая сторона</th>
                            <th>Победитель</th>
                        </tr>
                    </thead>
                    <tbody>
                        <HistoryTb />
                    </tbody>
                </table>
            </div>
            <div className={classes.top}>
                <center>ТОП-5 игроков</center>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Ник</th>
                            <th>Рейтинг</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{topUser1}</td>
                            <td>{topUser1R}</td>
                        </tr>
                        <tr>
                            <td>{topUser2}</td>
                            <td>{topUser2R}</td>
                        </tr>
                        <tr>
                            <td>{topUser3}</td>
                            <td>{topUser3R}</td>
                        </tr>
                        <tr>
                            <td>{topUser4}</td>
                            <td>{topUser4R}</td>
                        </tr>
                        <tr>
                            <td>{topUser5}</td>
                            <td>{topUser5R}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={classes.user}>
                <center>
                    <img src={face} />
                    <div>
                        <div className={classes.username}>
                            {props.user.username}
                        </div>
                        <div className={classes.ranking}>
                            <div >
                                Рейтинг: {props.user.ranking}
                            </div>
                            <div>
                                email:
                            </div>
                            <div>
                                {props.user.email}
                            </div>
                        </div>
                    </div>
                    <div className={classes.play}>
                        Играть с
                    </div>
                    <div>
                        Введите ник игрока:
                    </div>
                        <input className={classes.search} type='text' ref={user2} />
                        <button onClick={NewGame} className={classes.button}>
                            Пригласить
                        </button> 
                    <div>
                        {status}
                    </div>
                </center>
            </div>
            <div className={classes.notice}>
                <center> Уведомления 
                <div className={classes.n}>
                    <Notice_Invite inviter={inviter} invited_at={invited_at} />
                </div>
                <div className={classes.n}>
                    <Notice_Play />
                </div>
                </center>
            </div>
            <center>
                <button onClick={() => setShow(true)} className={classes.LO}>
                        Выйти из аккаунта
                </button>               
                </center>
                <LogOut onClose={() => setShow(false)} show={show}/> 
        </div>
    </>
    )
}

export default LK;