import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {centrifuge, user, sub} from './Centr';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App centrifuge={centrifuge} user={user} sub={sub}/>
);


reportWebVitals();
