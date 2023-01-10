import React, { useState } from "react";
import classes from './Login.module.css';
import google from './pictures/google.jpg';
import yandex from './pictures/Yandex.png';
import vk from './pictures/VK.png';
import { NavLink} from "react-router-dom";
import Header from "../Header/Header";


async function loginUser(credentials) {
    return fetch('/api/v1/sign_in', {  
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
/**********************************************проверит адрес******************************************* */
            window.location.assign('/LK'); //поменять адрес
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
     
const Login = (props) => {

    const [login, setLogin] = useState();
    const [pass, setPass] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({  
            login: login,                     
	        password: pass,
            
        });    
    }



    const Go = () => {
        return (
            <a href="/api/v1/oauth2/web/google">
                <img src={google} />
            </a>
        )
    }

    const Ya = () => {
        return (
            <a href="/api/v1/oauth2/web/yandex">
                <img src={yandex} />
            </a>
        )
    }

    const Vk = () => {
        return (
            <a href="/api/v1/oauth2/web/vk">
                <img src={vk} />
            </a>
        )
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
                        <Go />
                        <Ya />
                        <Vk />
                    </div>
                    <div className={classes.textT1}>
                        <center>Еще не зарегистрированы?</center>
                    </div>
                    <a className={classes.textT1}>
                        <NavLink to='/registration'>
                            <center>Зарегистрироваться!</center>
                        </NavLink>
                    </a>
                </div>
            </center>
        </div>

        </>
    


    )
}

export default Login;