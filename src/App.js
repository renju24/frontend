import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './components/Card/Card';
import GameDesk from './components/GameDesk/GameDesk';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import React, { useState } from "react";
import Login from './components/Card/Login';

function App () {
  const [token, setToken] = useState();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <body>
          <Routes>
            <Route index element={<Login setToken={setToken}/>} />
            <Route path='/card' element={<Card />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/gamedesk' element={<GameDesk />} />
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
