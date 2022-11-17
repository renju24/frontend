import React from 'react';
import classes from './LK.module.css';
import Header from "../Header/Header";

const LK = () => {

    let nik = React.createRef();

    let NewGame = () => {
        let username = nik.current.value;
        alert(username);
        //здесб наверно куда-то его отправить и обработать ответ
        window.location.assign('http://localhost:3000/gamedesk/'); //поменять адрес 
    }

    return (
        <>
            <Header />
            <center>
                <div className={classes.textH1}>
                    Прототип личного кабинета
                </div>
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
        </>
    )
}


export default LK;