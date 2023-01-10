import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import GameDesk from './components/GameDesk/GameDesk';
import Registration from './components/Registration/Registration';
import React, { useState } from "react";
import Login from './components/Card/Login';
import LK from './components/LK/LK';


function App(props) {
  
  const GoToLK = () => {
    if(!props.user.id){
      return
  }}
  
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <body>
          <Routes>
            <Route index element={<LK centrifuge={props.centrifuge} user={props.user} sub={props.sub}/>}/>
            <Route path='/login' element={<Login user={props.user}/>} />
            <Route path='/registration' element={<Registration user={props.user}/>} />
            <Route path='/gamedesk' element={<GameDesk centrifuge={props.centrifuge} user={props.user}/>} />        
            <Route path='/LK' element={<LK centrifuge={props.centrifuge} user={props.user} sub={props.sub}/>} />
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
