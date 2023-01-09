import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GameDesk from './components/GameDesk/GameDesk';
import Registration from './components/Registration/Registration';
import React, { useState } from "react";
import Login from './components/Card/Login';
import LK from './components/LK/LK';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <body>
          <Routes>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/gamedesk' element={<GameDesk />} /> 
            <Route path='/LK' element={<LK />} />
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
