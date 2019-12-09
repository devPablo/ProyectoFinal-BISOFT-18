// svg && svgDisplay

let letterMarked = null;

document.oncontextmenu = function(e) {
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
        if (event.target.closest('.svgImage')) {
            letterMarked = event.target;
            playSound();
        } else if (event.target.closest('.rect') && letterMarked != null) {
            let et = event.target;
            letterMarked.setAttribute('x', et.x.baseVal.value);
            letterMarked.setAttribute('y', et.y.baseVal.value);

            let s = new XMLSerializer();
            let lm = s.serializeToString(letterMarked);

            let savedChilds = event.target.parentNode.innerHTML + lm;
            event.target.parentNode.innerHTML = savedChilds;
            letterMarked.parentNode.removeChild(letterMarked);
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