class ScrabbleDB {
    constructor() {
        this.API_URL = 'http://localhost:3000/api/';
    }

    // Register user
    register(data) {
        return postMethodToAPI(this.API_URL + 'users/register', data);
    }

    // Get users
    getUsers() {
        return getMethodToAPI(this.API_URL + 'users');
    }
}