// svg && svgDisplay
const btnShuffle = document.querySelector('#btnShuffle');
btnShuffle.addEventListener('click', shuffle);

let letterMarked = null;
let isFromDisplay = false;

document.oncontextmenu = function (e) {
    let eID = e.srcElement.parentNode.parentNode.parentNode.id;
    if (eID == 'environment' || eID == 'letterDisplay') {
        e.preventDefault();
    }
}

document.addEventListener('click', function (event) {
    if (event.which == 1) {
        draw();
    }
});

function draw() {
    
    console.log(isFromDisplay);
    console.log(event.target);

    if (event.target.closest('.svgImage')) {
        isFromDisplay = event.target.getAttribute('data-display') == 'true';
        letterMarked = event.target;
        playSound();

    } else if (event.target.closest('.rect') && letterMarked != null) {
        let et = event.target;
        letterMarked.setAttribute('x', et.x.baseVal.value);
        letterMarked.setAttribute('y', et.y.baseVal.value);

        if (et.parentNode.parentNode.id == 'svgDisplay') {
            letterMarked.setAttribute('data-display', 'true');
        } else {
            letterMarked.setAttribute('data-display', 'false');
        }
        
        let s = new XMLSerializer();
        let lm = s.serializeToString(letterMarked);  

        let savedChilds = event.target.parentNode.innerHTML + lm;
        event.target.parentNode.innerHTML = savedChilds;
        letterMarked.parentNode.removeChild(letterMarked);

        let letter = letterMarked.getAttribute('data-letter');
        
        if (isFromDisplay && et.getAttribute('data-display') == 'false') {
            applyMove(letter, true);
        } 
        if (!isFromDisplay && et.getAttribute('data-display') == 'true') {
            applyMove(letter, false);
        }


        letterMarked = null;
        playSound();
    }


    // Paint - Wall
    // if (!event.target.closest('.rect')) return;
    // event.target.setAttribute('fill', 'green');
    // playSound();
    // console.log(event.target.parentElement.getAttribute('data-id'));

}

function playSound() {
    let audio = new Audio('./resources/pop.flac');
    audio.play();
}

function applyMove(letter, remove) {
    let player = game.turn;
    if (remove) {
        game.turn.removeLetter(letter);
    } else {
        game.turn.addLetter(letter);
    }

    game.update();
    console.log(game.turn);
}

function shuffle() {
    game.turn.shuffle();
    game.update();
    generatePlayerDisplay(game.turn);
}