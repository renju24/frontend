import React, { useState } from "react";
import { json, NavLink } from "react-router-dom";
import classes from "./Registration.module.css";
import google from './pictures/google.jpg';
import yandex from './pictures/Yandex.png';
import vk from './pictures/VK.png';
import PropTypes from 'prop-types';
import Header from "../Header/Header";


async function loginUser(credentials) {
    return fetch('https://renju24.com/api/v1/sign_up', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then((response) => {
            if(response.ok) {
                return response.json;
            }
            return Promise.reject(response);
        })   
        .then((jsonResponse) => {
            alert(jsonResponse.token); //отладка
            window.location.assign('http://localhost:3000/LK/'); //поменять адрес 
        })
        .catch((response) =>{
            response.json().then((jsonResponse) => {
                alert(
                    jsonResponse.error.code,
                    jsonResponse.error.message
                );
            })
        })
}

const Registration = ({ setToken }) => {
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rpassword, setRpassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({  
            "username": username,
            "email": email,
            "password": password,
            "repeated_password": rpassword,
        });
        setToken(token);
        console.log('Login complete');
    }
   
    return (
        <><Header />
        <div className={classes.page}>
            <center>
                <div className={classes.textH1}>
                    <center>Welcome to Renju24!</center>
                </div>
                <div className={classes.textH2}>
                    <center>Добро пожаловать в Рендзю онлайн!</center>
                </div>

                <form className={classes.box} onSubmit={handleSubmit}>
                    <div className={classes.left}>
                        <div className={classes.textT1}>
                            <center>Зарегистрируйтесь, чтобы начать</center>
                        </div>
                        <label><div><center>
                            <input type="text" placeholder=" login" className={classes.conteiner}
                                onChange={e => setUsername(e.target.value)} />
                        </center></div></label>
                        <label><div><center>
                            <input type="email" placeholder=" email" className={classes.conteiner}
                                onChange={e => setEmail(e.target.value)} />
                        </center></div></label>
                        <label><div><center>
                            <input type="password" placeholder=" password" className={classes.conteiner}
                                onChange={e => setPassword(e.target.value)} />
                        </center></div></label>
                        <label><div><center>
                            <input type="password" placeholder=" repeat password" className={classes.conteiner}
                                onChange={e => setRpassword(e.target.value)} />
                        </center></div></label>
                        <div><center>
                            <button type="submit" className={classes.button}>Зарегистрироваться</button>
                        </center></div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.textT1}>
                            <center>Зарегистрироваться через</center>
                        </div>
                        <div className={classes.img}>
                            <a href="/api/v1/oauth2/web/google">
                                <img src={google} />
                            </a>
                            <a href="/api/v1/oauth2/web/yandex">
                                <img src={yandex} />
                            </a>
                            <a href="/api/v1/oauth2/web/vk">
                                <img src={vk} />
                            </a>
                        </div>
                        <div className={classes.textT1}>
                            <center>У Вас уже есть аккаунт?</center>
                        </div>
                        <div>
                            <a className={classes.textT1}>
                                <NavLink to='/Login'>
                                    <center>Войти</center>
                                </NavLink>
                            </a>
                        </div>
                    </div>
                </form>
            </center>
        </div></>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Registration;