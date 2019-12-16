const playerScreen = document.querySelector('#playerScreen');
const registerScreen = document.querySelector('#registerScreen');
const gameScreen = document.querySelector('#gameScreen');
const leaderboardScreen = document.querySelector('#leaderboardScreen');
const btnPlay = document.querySelector('#btnPlay');
const btnLeaderboard = document.querySelector('#btnLeaderboard');
const closeRegister = document.querySelector('#closeRegisterWrapper');
const closeLeaderboard = document.querySelector('#closeLeaderboardWrapper');
const btnRegisterConfirm = document.querySelector('#btnRegisterConfirm');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const scrabbleDB = new ScrabbleDB();
let game;

// Temp
let usernames = [];
scrabbleDB.getUsers().done(res => {
    res.res.forEach(e => usernames.push(e[0]));
});

// tmpGame();
function tmpGame() {
    playerScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    let players = [];
    let p1Player = new Player(p1.value.replace(/\s/g, ''));
    let p2Player = new Player(p2.value.replace(/\s/g, ''));
    players.push(p1Player, p2Player);
    game = new Game(players);
    generateEnvironment();


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

btnLeaderboard.addEventListener('click', openLeaderboard);

function playGame() {
    let p1Res = validate(p1);
    let p2Res = validate(p2);
    if (p1Res && p2Res) {
        playerScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    }
    

    // TMP
    tmpGame();
    
    setInitialRound();
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
    if (usernames.includes(val)) {
        // Username found
        ele.style.borderRight = '5px solid #32DB6E';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }

        return true;

    } else if (val != '') { 
        // Username error
        
        ele.style.borderRight = '5px solid #EB3A34';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }
        

        // Create register username elements
        let chk = document.createElement('i');
        chk.id = 'loginCheck';
        chk.classList.add('fas', 'fa-check');

        let reg = document.createElement('button');
        reg.type = 'button';
        reg.classList.add('btnRegister');
        reg.appendChild(chk);
        reg.addEventListener('click', () => openRegister(val));
        
        ele.parentNode.appendChild(reg);

        return false;
    } else if (val == '') {
        ele.style.borderRight = '5px solid #F2F2F2';
        if (ele.parentNode.childNodes.length > 3) {
            ele.parentNode.removeChild(ele.parentNode.childNodes[3]);
        }
    }
}



// Register
closeRegister.addEventListener('click', closeRegisterWrapper);

function closeRegisterWrapper() {
    registerScreen.style.display = 'none';
}


function openRegister(username) {
    registerScreen.style.display = 'flex';
    $('#usernameSubtitle').text(username);
    btnRegisterConfirm.addEventListener('click', () => register(username));
}

function register(username) {
    closeRegisterWrapper();

    // Call DB
    scrabbleDB.register({ username: username}).done(() => {
        scrabbleDB.getUsers().done(res => {
            usernames = [];
            res.res.forEach(e => usernames.push(e[0]));
        validate(p1);
        validate(p2);
        });
        
    });
}




// Leaderboard
closeLeaderboard.addEventListener('click', closeLeaderboardWrapper);

function openLeaderboard() {
    leaderboardScreen.style.display = 'flex';
}

function closeLeaderboardWrapper() {
    leaderboardScreen.style.display = 'none';
}