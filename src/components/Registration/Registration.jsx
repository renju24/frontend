import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Registration.module.css";
import google from './pictures/google.jpg';
import yandex from './pictures/Yandex.png';
import vk from './pictures/VK.png';


const Registration = () => {
    return (
        <div className={classes.page}>
            <center>
                <div className={classes.textH1} >
                    <center>Welcome to Renju24!</center>
                </div>
                <div className={classes.textH2}>
                    <center>Добро пожаловать в Рендзю онлайн!</center>
                </div>

                <form className={classes.box}>
                    <div className={classes.left}>
                        <div className={classes.textT1}>
                            <center>Зарегистрируйтесь, чтобы начать</center>
                        </div>
                        <label><div><center>
                            <input type="text" required name="login" placeholder=" login" className={classes.conteiner} />
                        </center></div></label>
                        <label><div><center>
                            <input type="email" required name="email" placeholder=" email" className={classes.conteiner} />
                        </center></div></label>
                        <label><div><center>
                            <input type="password" required name="password" placeholder=" password" className={classes.conteiner} />
                        </center></div></label>
                        <label><div><center>
                            <input type="password" required name="repeatpassword" placeholder=" repeat password" className={classes.conteiner} />
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
                                <NavLink to='/card'>
                                    <center>Войти</center>
                                </NavLink>
                            </a>
                        </div>
                    </div>
                </form>
            </center>
        </div>
    )
}

export default Registration;