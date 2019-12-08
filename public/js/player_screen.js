const playerScreen = document.querySelector('#playerScreen');
const gameScreen = document.querySelector('#gameScreen');
const btnPlay = document.querySelector('#btnPlay');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

// Temp
let tmpUsernames = ['pbonillag', 'lmonge'];

p1.addEventListener('keyup', validate);
p2.addEventListener('keyup', validate);

gameScreen.style.display = 'none';
btnPlay.addEventListener('click', playGame);

function playGame() {
    let p1U = p1.value;
    let p2U = p2.value;

    playerScreen.style.display = 'none';
    gameScreen.style.display = 'block';

}

function validate() {
    let val = this.value.replace(/\s/g, '');
    if (tmpUsernames.includes(val)) {
        // Username found
        this.style.borderRight = '5px solid #32DB6E';

    } else {
        // Username error
        this.style.borderRight = '5px solid #EB3A34';
    }
}
