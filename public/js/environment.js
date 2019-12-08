const width = 50;
const height = 50;
const nodesRow = 15;
const svg = document.querySelector('#svg');

document.querySelector('#clrEnv').addEventListener('click', function() {
    generateEnvironment();
});

generateEnvironment();


function calcPos(num) {
    return num*2+1;
}


// Text inside group
// <text x="${x+18}" y="${y+30}" font-size="18px">A</text>

function generateEnvironment() {
    let content;

    let x = 0;
    let y = 0;

    for (let i = 1; i < 226; i++) {
        content +=
        `
        <g data-id="${i-1}">
            <rect class="rect" x="${x}" y="${y}" width="${width}" height="${height}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2; stroke-width: 1;"></rect>       
            
        </g>
        `;
        x += width;
        if (i % nodesRow == 0 && i != 0) {
            x = 0;
            y += height;
        }
    }
    
    svg.innerHTML = content;

    paintScrabbleBonuses();
}

function paintScrabbleBonuses() {
    let eID;
    for (let i = 0; i < svg.childNodes.length; i++) {
        if (svg.childNodes[i].nodeName == 'g') {
            eID = svg.childNodes[i].getAttribute('data-id');
            	        
            // Gray (Star) - Game initialization point
            if (eID == 112) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', 'gray');
            }

            // Green (3B) - Triple bonus letter
            if (eID == 4   || eID == 10  || 
                eID == 16  || eID == 28  || 
                eID == 36  || eID == 38  || 
                eID == 48  || eID == 56  ||
                eID == 60  || eID == 74  || 
                eID == 80  || eID == 84  || 
                eID == 92  || eID == 102 ||
                eID == 122 || eID == 132 ||
                eID == 140 || eID == 144 || 
                eID == 150 || eID == 164 ||
                eID == 168 || eID == 176 || 
                eID == 186 || eID == 188 || 
                eID == 196 || eID == 208 ||
                eID == 214 || eID == 220) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', 'green');
            }

            // Orange (3W) - Triple bonus word
            if (eID == 2 || eID == 12
                || eID == 30 || eID == 44
                || eID == 180 || eID == 194
                || eID == 212 || eID == 222) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', 'darkorange');
            }

            // Yellow (2W) - Double bonus word
            if (eID == 20 || eID == 24 || eID == 52 || eID == 76
                || eID == 88 || eID == 108 || eID == 116 || eID == 136
                || eID == 148 || eID == 172 || eID == 200 || eID == 204) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', 'yellow');
            }

            // Blue (2B) - Double bonus letter
            if (eID == 32 || eID == 42 || eID == 66
                || eID == 68 || eID == 94 || eID == 100
                || eID == 124 || eID == 130 || eID == 156
                || eID == 158 || eID == 182 || eID == 192) {
                svg.childNodes[i].childNodes[1].setAttribute('fill', 'blue');
            }
        }
    }
}

document.oncontextmenu = function(e) {
    let eID = e.srcElement.parentNode.parentNode.parentNode.id;
    if (eID == 'environment' || eID == 'letterDisplay') {
        e.preventDefault();
    }
}

let paint = false;
let erase = false;

document.addEventListener('click', function (event) {
	if (event.which == 1) {
        draw(1);
    }

    if (event.which == 3) {
        draw(0);
    }
});

document.addEventListener('mouseover', function(event) {
    if (paint) {
        draw(1);
    }

    if (erase) {
        draw(0);
    }
});

document.addEventListener('mousedown', function(event) {
    if (event.which == 3) {
        if (!erase) {
            erase = true;
            draw(0);
        }
    }
    if (event.which == 1) {
        if (!paint) {
            paint = true;
            draw(1);
        } 
    }
    
});

document.addEventListener('mouseup', function(event) {
    if (paint) {
        paint = false;
    }
    if (erase) {
        erase = false;
    }
});

function draw(mode) {
    if (mode == 0) {
        // Erase
        if (!event.target.closest('.rect')) return;
        event.target.setAttribute('fill', '#FFF');
    }

    if (mode == 1) {
        // Paint - Wall
        if (!event.target.closest('.rect')) return;
        event.target.setAttribute('fill', 'green');
        console.log(event.target.parentElement.getAttribute('data-id'));
    }
}