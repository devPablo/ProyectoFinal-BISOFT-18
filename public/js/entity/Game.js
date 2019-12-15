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
        this.getFromAllLetters(this.playerList[0]);
        this.getFromAllLetters(this.playerList[1]);

        
    }

    update() {
        this.turn = (this.turn.username == this.playerList[0].username) ? this.playerList[0] : this.playerList[1];
    }

    nextTurn() {
        this.getNewLetters(this.turn);
        this.turn = (this.turn.username == this.playerList[0].username) ? this.playerList[1] : this.playerList[0];
        this.update();
        generatePlayerDisplay(this.turn);
        updateNextRound(this.turn);
    }

    validateUserMove(username) {
        return (this.turn.username == username);
    }

    exchange(player) {
        for (let i = 0; i < 7; i++) {
            this.allLetters.push(player.letters[i]);
        }
        player.letters = [];
        this.getFromAllLetters(player);
        this.update();
        generatePlayerDisplay(player);
        this.nextTurn();
    }

    getFromAllLetters(player) {
        for (let i = 0; i < 7; i++) {
            let letter = this.allLetters[Math.floor(Math.random()*this.allLetters.length)];
            player.letters.push(letter);
            let index = this.allLetters.indexOf(letter);
            this.allLetters.splice(index, 1);
        }
    }

    getNewLetters(player) {
        let amount = player.letters.length;
        for (let i = 0; i < 7-amount; i++) {
            let letter = this.allLetters[Math.floor(Math.random()*this.allLetters.length)];
            player.letters.push(letter);
            let index = this.allLetters.indexOf(letter);
            this.allLetters.splice(index, 1);
        }
    }

    end() {
        this.nextTurn();
        document.querySelector('#gameScreen').style.display = 'none';
        document.querySelector('#playerScreen').style.display = 'flex';
        sessionStorage.removeItem('_game');
    }
}