const playerScreen = document.querySelector('#playerScreen');
const gameScreen = document.querySelector('#gameScreen');
const btnPlay = document.querySelector('#btnPlay');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
let game;

// Temp
let tmpUsernames = ['pbonillag', 'lmonge'];

tmpGame();
function tmpGame() {
    playerScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    let players = [];
    let p1 = new Player('pbonillag');
    let p2 = new Player('lmonge');
    players.push(p1, p2);
    game = new Game(players);


    sessionStorage.setItem('_game', JSON.stringify(game));
    tmpGame2();
}

function tmpGame2() {
    let ssGame = JSON.parse(sessionStorage.getItem('_game'));
    generatePlayerDisplay(ssGame.turn);
}

// --------------------

p1.addEventListener('keyup', validate);
p2.addEventListener('keyup', validate);

// gameScreen.style.display = 'none';
btnPlay.addEventListener('click', playGame);

function playGame() {
    let p1Res = validate(p1);
    let p2Res = validate(p2);
    if (p1Res && p2Res) {
        playerScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    }
}

function validate(e) {
    let val;
    let ele;
    if (this.nodeName != 'INPUT') {
        ele = e;
    } else {
        ele = this;
    }
    val = ele.value.replace(/\s/g, '');
    if (tmpUsernames.includes(val)) {
        // Username found
        ele.style.borderRight = '5px solid #32DB6E';
        return true;

    } else {
        // Username error
        ele.style.borderRight = '5px solid #EB3A34';
        return false;
    }
}
