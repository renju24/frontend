import { Centrifuge } from 'centrifuge';
import React, { useState } from 'react';

const centrifuge = new Centrifuge('wss://renju24.com/connection/websocket', {
    //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTAiLCJleHAiOjM2MDB9.m6Aeh9zdOVdeE5CmTA0zJns8tnxlV7ToV61c0WWvHps"
    //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NSIsImV4cCI6MzYwMH0.iPWRKWxd7mDPjkQRApl5pGECvCdyzRCy_iRby75Aiwk"
});

const user = {
    username: null,
    id: null,
    email: null,
    ranking: null,
    
};

var id = null;

centrifuge.connect(); //запрос на подключение к серверу

const sub = {};

centrifuge.on('connected', function (ctx) {
    console.log('connected TRUE');
    user.username = ctx.data.username;
    user.id = ctx.data.id;
    user.email = ctx.data.email;
    user.ranking = ctx.data.ranking;
    id = ctx.data.id;
    sub.s = centrifuge.newSubscription('user_' + ctx.data.id);
    if (window.location.pathname == '/') {
        window.location = '/LK';
    }
});


centrifuge.on('disconnected', function (ctx) {
    console.log('connected FALSE');
    if ((window.location.pathname == '/LK') || (window.location.pathname == '/LK/')) {
        window.location = '/';
    }
});

export { centrifuge, user, sub };
