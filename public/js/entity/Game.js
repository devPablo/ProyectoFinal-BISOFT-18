class Game {
    constructor(id, playerList) {
        this.id = id;
        this.playerList = playerList; // Array
        this.turn = playerList[0]; // Default: First Player

        this.update();
    }

    update() {
        let letters = [];

        scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[0].username }).done(res => {
            res.res.forEach(e => letters.push(e[1]));
            this.playerList[0].letters = letters;

            scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[1].username }).done(res => {
                letters = [];
                res.res.forEach(e => letters.push(e[1]));
                this.playerList[1].letters = letters;
            });
        });
    }

    nextTurn() {
        let letters = [];

        scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[0].username }).done(res => {
            res.res.forEach(e => letters.push(e[1]));
            this.playerList[0].letters = letters;

            scrabbleDB.getPlayerLetters({ id: this.id, username: this.playerList[1].username }).done(res => {
                letters = [];
                res.res.forEach(e => letters.push(e[1]));
                this.playerList[1].letters = letters;

                // Main
                this.turn = (this.turn.username == this.playerList[0].username) ? this.playerList[1] : this.playerList[0];

                generatePlayerDisplay(this.id, this.turn.username);
                updateNextRound(this.turn);
            });
        });
    }

    validateUserMove(username) {
        return (this.turn.username == username);
    }

    exchange() {
        this.nextTurn();
    }

    validateWord(letters) {
        let data = 
        {
            id: this.id,
            letters: letters
        };
        return scrabbleDB.validateWord(data);
    }

    end() {
        this.nextTurn();
        document.querySelector('#gameScreen').style.display = 'none';
        document.querySelector('#playerScreen').style.display = 'flex';
    }
}