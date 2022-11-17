import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GameDesk from './components/GameDesk/GameDesk';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import React, { useState } from "react";
import Login from './components/Card/Login';
import LK from './components/LK/LK';
import { Centrifuge } from 'centrifuge';

function App () {
  const [token, setToken] = useState();
   if(token) {
     return <LK/>
  }
  return (
    <BrowserRouter>
      <div className="app-wrapper">
          <body>
          <Routes>
            <Route index element={<Login setToken={setToken}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration setToken={setToken} />} />
            <Route path='/gamedesk' element={<GameDesk />} /> //потом убрать, чтобы можно было входит только после входа
            <Route path='/LK' element={<LK />} />
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
