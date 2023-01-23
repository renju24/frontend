import React, { useState } from "react";
import { json, NavLink } from "react-router-dom";
import classes from "./Registration.module.css";
import google from './pictures/google.jpg';
import yandex from './pictures/Yandex.png';
import vk from './pictures/VK.png';
import Header from "../Header/Header";


const Registration = (props) => {
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rpassword, setRpassword] = useState();

    const [eror, setEror] = useState('');

    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({  
            username: username,
            email: email,
            password: password,
            repeated_password: rpassword,
        });

    }

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
                window.location.assign('/LK/'); 
            })
            .catch((response) =>{
                response.json().then((jsonResponse) => {
                    ErrorMesagge(jsonResponse.error.message);
                })
            })
    }

    const ErrorMesagge = (mesagge) =>{
        switch (mesagge) {
            case 'invalid password length':
                setEror('Невалидная длина пароля. Разрешено от 8 до 64 символов');
                break;
            case 'username is required':
                setEror('Не прислали username');
                break;
            case 'internal server error':
                setEror('Ошибка на стороне сервера');
                break;
            case 'email is required':
                setEror('Не прислали email');
                break;
            case 'password is required':
                setEror('Не прислали пароль');
                break;
            case 'repeated_password is required':
                setEror('Не прислали повторный пароль');
                break;
            case 'invalid username length':
                setEror('Невалидная длина username. Разрешено от 4 до 32 символов');
                break;
            case 'invalid username character':
                setEror('Username содержит недопустимые символы. Разрешены только a-z, 0-9, . и _');
                break;
            case 'invalid email':
                setEror('Невалидный email. Например, если не содержит символ @');
                break;
            case 'invalid email length':
                setEror('Невалидная длина email. Разрешено от 5 до 84 символов');
                break;
            case 'invalid password character':
                setEror('Пароль содержит недопустимые символы. Разрешены только латиница и цифры');
                break;
            case 'missing letter character':
                setEror('Пароль должен содержать хотя бы одну букву');
                break;
            case 'missing digit character':
                setEror('Пароль должен содержать хотя бы одну цифру');
                break;
            case 'passwords are not equal':
                setEror('Пароли не совпадают');
                break;
            case 'username is already taken':
                setEror('Пользователь с таким username уже зарегистрирован');
                break;
            case 'email is already taken':
                setEror('Пользователь с таким email уже зарегистрирован');
                break;
            case 'invalid credentials':
                setEror('Неправильный пароль');
                break;
            case 'user not found':
                setEror('Пользователь с таким логином не найден');
                break;
        }
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
                        <div className={classes.textT1}><center>
                            {eror}
                        </center></div>    
                    </div>
                    <div className={classes.right}>
                        <div className={classes.textT1}>
                            <center>Зарегистрироваться через</center>
                        </div>
                        <div className={classes.img}>
                            <a href="https://renju24.com/api/v1/oauth2/web/google">
                                <img src={google} />
                            </a>
                            <a href="https://renju24.com/api/v1/oauth2/web/yandex">
                                <img src={yandex} />
                            </a>
                            <a href="https://renju24.com/api/v1/oauth2/web/vk">
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


export default Registration;