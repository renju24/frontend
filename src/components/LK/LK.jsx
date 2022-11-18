import React from 'react';
import classes from './LK.module.css';
import Header from "../Header/Header";

const LK = () => {

    let nik = React.createRef();

    let NewGame = () => {
        let username = nik.current.value;
        alert(username); //отладка
        //здесб наверно куда-то его отправить и обработать ответ
        window.location.assign('http://localhost:3000/gamedesk/'); //поменять адрес 
    }

    return (
        <>
            <Header />

            <div className={classes.conteiner}>
                <div className={classes.history}>
                    История игр
                </div>
                <div className={classes.top}>
                    Рейтинг
                </div>
                <div className={classes.user}>
                    Карточка
                    <center>
                        <div>
                            Для приглашения игрока введите ник:
                        </div>
                        <div><textarea ref={nik} className={classes.conteiner}>
                        </textarea>
                        </div>
                        <div>
                            <button onClick={NewGame} className={classes.button}>
                                Пригласить
                            </button></div>
                    </center>
                </div>
                <div className={classes.notice}>
                    Уведомления
                </div>
            </div>
        </>
    )
}


export default LK;