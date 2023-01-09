import { Centrifuge } from 'centrifuge';

const centrifuge = new Centrifuge('wss://renju24.com/connection/websocket', {
    //**************************************потом убрать****************************************************************************
    //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NSIsImV4cCI6MzYwMH0.iPWRKWxd7mDPjkQRApl5pGECvCdyzRCy_iRby75Aiwk"
});

centrifuge.connect(); //запрос на подключение к серверу
centrifuge.on('connected', function (ctx) {
    console.log('connected TRUE');
});
centrifuge.on('disconnected', function (ctx) {
    console.log('connected FALSE');
});

export default centrifuge;
