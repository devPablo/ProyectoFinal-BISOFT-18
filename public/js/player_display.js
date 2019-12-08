const svgDisplay = document.querySelector('#svgDisplay');
generatePlayerDisplay();

function generatePlayerDisplay() {
    let content;

    let x = 0;
    let y = 0;

    for (let i = 0; i < 7; i++) {
        content +=
        `
        <g data-id="${i}">
            <rect class="rect" x="${x}" y="${y}" width="${width}" height="${height}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 0.2; stroke-width: 1;"></rect>       
            
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