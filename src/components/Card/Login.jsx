import React, { useState } from "react";
import classes from './Login.module.css';
import google from './pictures/google.jpg';
import yandex from './pictures/Yandex.png';
import vk from './pictures/VK.png';
import PropTypes from 'prop-types';
import { NavLink, Navigate } from "react-router-dom";
import Header from "../Header/Header";


//вначале нужно провериить сервер на пинг, потом пробовать отправлять запрос
//и ловить ошибки ??

async function loginUser(credentials) {
    return fetch('https://renju24.com/api/v1/sign_in', {  //адрес поменять https://renju24.com/api/v1/sign_in
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
            alert(jsonResponse.token);
            window.location.assign('http://localhost:3000/LK'); //поменять адрес 

        })
        .catch((response) =>{
            response.json().then((jsonResponse) => {
                alert(
                    jsonResponse.error.code,
                    jsonResponse.error.message
                );
            })
        })    
    
    // .then(data => data.json())
    //     .catch(error => alert(error.massage));
        
}

const Login = ({ setToken }) => {

    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({  
            "login": login,                     //вот запрос, вроде правильно
	        "password": pass,
            
        });
        setToken(token);
        console.log('Login complete');
    }

    return (
        <><Header />
        <div className={classes.card}>
            <div className={classes.textH1}>
                <center>Welcome to Renju24!</center>
            </div>
            <div className={classes.textH2}>
                <center>Добро пожаловать в Рендзю онлайн!</center>
            </div>
            <center>
                <div className={classes.box}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.textT1}>
                            <center>Войти</center>
                        </div>
                        <label>
                            <div>
                                <center>
                                    <input type="text" placeholder=" login" className={classes.conteiner}
                                        onChange={e => setLogin(e.target.value)} />
                                </center>
                            </div>
                        </label>
                        <label>
                            <div>
                                <center>
                                    <input type="password" placeholder=" password" className={classes.conteiner}
                                        onChange={e => setPass(e.target.value)} />
                                </center>
                            </div>
                        </label>
                        <div>
                            <center>
                                <button type="submit" className={classes.button}>Войти</button>
                            </center>
                        </div>
                    </form>
                    <div>
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
                        <center>Еще не зарегистрированы?</center>
                    </div>
                    <a className={classes.textT1}>
                        <NavLink to='/registration'>
                            <center>Зарегистрироваться!</center>
                        </NavLink>
                        <NavLink to='/gamedesk'>
                            <center>Играть без регистрации (отладка)</center>
                        </NavLink>
                    </a>
                </div>
            </center>
        </div></>



    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;