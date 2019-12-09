const svgDisplay = document.querySelector('#svgDisplay');

let ssGame = JSON.parse(sessionStorage.getItem('_game'));
let p1Letters = ssGame.playerList[0].letters;
generatePlayerDisplay(p1Letters);

function generatePlayerDisplay(letters) {
    let content;

    let x = 0;
    let y = 0;

    for (let i = 0; i < 7; i++) {
        letter = (letters[i] == 'Ñ') ? 'enne' : letters[i];

        content +=
        `
        <g data-id="${i}">
            
            <rect class="rect" x="${x}" y="${y}" width="${width}" height="${height}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2; stroke-width: 1;"></rect>       
            <image href="./resources/letter_${letter}.png" class="svgImage" x="${x}" y="${y}" data-letter="${letters[i]}" width="50" height="50" />
        </g>
        `;
        x += width;
        if (i % nodesRow == 0 && i != 0) {
            x = 0;
            y += height;
        }
    }
    
    svgDisplay.innerHTML = content;
}