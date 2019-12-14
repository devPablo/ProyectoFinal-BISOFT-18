const p1Frame = document.querySelector('#p1Frame');
const p2Frame = document.querySelector('#p2Frame');
const navMiddle = document.querySelector('#navMiddle');
const btnReady = document.querySelector('#btnReady');

btnReady.addEventListener('click', () => ready(game.turn));

function setInitialRound() {
    $('#p1FrameUsername').text(game.playerList[0].username);
    $('#p2FrameUsername').text(game.playerList[1].username);
}

function updateNextRound(player) {
    if (game.playerList[0].username != player.username) { // Next: P2
        document.querySelector('#p1FrameCircle').classList.remove('frameCircleTurn');
        document.querySelector('#p1FrameCircle').classList.add('frameCircleNoTurn');
        
        document.querySelector('#p2FrameCircle').classList.remove('frameCircleNoTurn');
        document.querySelector('#p2FrameCircle').classList.add('frameCircleTurn');  
        
        document.querySelector('#p1FrameUsername').classList.remove('frameTextTurn');
        document.querySelector('#p1FrameUsername').classList.add('frameTextNoTurn');
        
        document.querySelector('#p2FrameUsername').classList.remove('frameTextNoTurn');
        document.querySelector('#p2FrameUsername').classList.add('frameTextTurn');   
    } else if (game.playerList[1].username != player.username) { // Next: P1
        document.querySelector('#p2FrameCircle').classList.remove('frameCircleTurn');
        document.querySelector('#p2FrameCircle').classList.add('frameCircleNoTurn');
        
        document.querySelector('#p1FrameCircle').classList.remove('frameCircleNoTurn');
        document.querySelector('#p1FrameCircle').classList.add('frameCircleTurn');  
        
        document.querySelector('#p2FrameUsername').classList.remove('frameTextTurn');
        document.querySelector('#p2FrameUsername').classList.add('frameTextNoTurn');
        
        document.querySelector('#p1FrameUsername').classList.remove('frameTextNoTurn');
        document.querySelector('#p1FrameUsername').classList.add('frameTextTurn');   
    }
}

// DB Game Implementation
function ready(player) {
    console.log(player);

    if (true) {
        game.nextTurn();
    }
}