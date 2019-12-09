class Game {
    constructor(playerList) {
        this.playerList = playerList; // Array
        this.turn = playerList[0]; // Default: First Player
        this.allLetters = 
        [
            'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
            'B', 'B',
            'C', 'C', 'C', 'C',
            'D', 'D', 'D', 'D', 'D',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'F',
            'G', 'G',
            'H', 'H',
            'I', 'I', 'I', 'I', 'I', 'I',
            'J',
            'L', 'L', 'L', 'L',
            'M', 'M',
            'N', 'N', 'N', 'N', 'N',
            'Ñ',
            'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
            'P', 'P',
            'Q',
            'R', 'R', 'R', 'R', 'R',
            'S', 'S', 'S', 'S', 'S', 'S',
            'T', 'T', 'T', 'T',
            'U', 'U', 'U', 'U', 'U',
            'V',
            'X',
            'Y',
            'Z' 
        ]; // Temp Letters

        this.assignLettersToPlayers();
    }

    loadLetters() {
        // Call DB
        this.allLetters = null;
    }

    assignLettersToPlayers() {
        // Default: 7
        for (let i = 0; i < 7; i++) {
            let letter = this.allLetters[Math.floor(Math.random()*this.allLetters.length)];
            this.playerList[0].letters.push(letter);
        }

        for (let i = 0; i < 7; i++) {
            let letter = this.allLetters[Math.floor(Math.random()*this.allLetters.length)];
            this.playerList[1].letters.push(letter);
        }
    }
}