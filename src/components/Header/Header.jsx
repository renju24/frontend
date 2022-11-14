import React from "react";
import classes from './Header.module.css';
import logo from './pictures/Logo.png';
import about from './pictures/about.png';

function Header() {
    return <header className={classes.header}>
        <div>
            <img src={logo} className={classes.logo} />
            <a href="https://ru.wikipedia.org/wiki/Рэндзю">
                <img src={about} className={classes.about} title="Об игре Рендзю" />
            </a>
        </div>
    </header>
}

export default Header;