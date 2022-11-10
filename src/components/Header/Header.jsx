import React from "react";
import classes from './Header.module.css';
import logo from './pictures/Logo.png';
import about from './pictures/about.png';

function Header() {
    return <header className={classes.header}>
        <div>
            <img src={logo} className={classes.logo} />
        
            <img src={about} className={classes.about} title="Об игре Рендзю" href='https://ru.wikipedia.org/wiki/Рэндзю'/>
        </div>
    </header>
}

export default Header;