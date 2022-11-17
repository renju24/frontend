const centrifuge = new Centrifuge('wss://renju24.com/connection/websocket');
centrifuge.connect(); //подключение
centrifuge.on('connected', function(ctx) {
    // теперь клиент подключен к Centrifugo и аутентифицирован
});
centrifuge.on('connecting', function(ctx) {
    // делайте все, что вам нужно, в случае подключения к серверу
});
centrifuge.on('disconnected', function(ctx) {
    // делайте все, что вам нужно, в случае отключения от сервера
});
centrifuge.disconnect(); //отключение

centrifuge.rpc("my.method.name", {"input": "hello"}).then(function(res) { //метод позволяет отправлять rpc-запрос от клиента 
    console.log('rpc result', res);                                       //к серверу и ждать ответа данных.
}, function(err) {
    console.log('rpc error', err);
});

centrifuge.on('error', function(ctx) {
    console.log(ctx);
});



// DOM referenes
const cells = document.querySelectorAll("td");
let whitePieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span");
const whiteTurnNext = document.querySelectorAll(".white-turn-next");
const blackTurnNext = document.querySelectorAll(".black-turn-next");
const divider = document.querySelector("#divider")

// player properties
let turn = false;
let whiteScore = 0;
let blackScore = 0;
let playerPieces;

//initialize event listeners on pieces
function givePiecesEventListeners () {
    if (turn) {
        for (let i = 0; i < whitePieces.leght; i++){
            whitePieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.leght; i++){
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

// holds the lenght of the players piece count
function getPlayerPieces() {
    if (turn) {
        playerPieces = whitePieces;
        console("white go");
    } else {
        playerPieces = blackPieces;
    }
    removeCellonclick();
    resetBoards();
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets borders to default
function resetBorders() {
    // for (let i = 0; i < playerPieces.length; i++) {
    //     playerPieces[i].style.border = "1px solid white";
    // }
    getSelectedPiece();
}

// gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
}



// gives the piece a green highlight for the user (showing its movable)
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        giveCellsClick();
    } else {
        return;
    }
}

// makes the move that was clicked
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove(); //тут добавить?
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    
    if (turn) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
    } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}








