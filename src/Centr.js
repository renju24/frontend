import { Centrifuge } from 'centrifuge';
import React from "react";

const centrifuge = new Centrifuge('wss://renju24.com/connection/websocket', {
    //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NSIsImV4cCI6MzYwMH0.iPWRKWxd7mDPjkQRApl5pGECvCdyzRCy_iRby75Aiwk"
});

const user = {
    username: '',
    id: '',
    email: '',
    ranking: ''
};

centrifuge.connect(); //запрос на подключение к серверу
centrifuge.on('connected', function (ctx) {
    console.log('connected TRUE');
    user.username = ctx.data.username;
    user.id = ctx.data.id;
    user.email = ctx.data.email;
    user.ranking = ctx.data.ranking;
});
centrifuge.on('disconnected', function (ctx) {
    console.log('connected FALSE');
});

const sub = centrifuge.newSubscription('user_' + user.id);

export {centrifuge, user, sub};