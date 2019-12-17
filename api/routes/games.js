const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM TABLERO';

    oracledb.getConnection(
        dbConfig,
        (err, connection) => {
            if (err) { console.error(err); return; }
            connection.execute(
                query,
                function (err, result) {
                    if (err) { console.error(err); return; }
                    {
                        res.status(200).json({
                            message: 'Handling GET requests to /games',
                            res: result.rows
                        });
                    };
                });
        });
});

// Get letters of player of a specific game
router.get('/get_letters/:id&:username', (req, res, next) => {
    const query = `SELECT ID_USUARIO, ID_LETRA FROM LETRAS_USUARIO_TABLERO WHERE
                   ID_USUARIO = '${req.params.username}' AND
                   ID_TABLERO = ${req.params.id}`;

    oracledb.getConnection(
        dbConfig,
        (err, connection) => {
            if (err) { console.error(err); return; }
            connection.execute(
                query,
                function (err, result) {
                    if (err) { console.error(err); return; }
                    {
                        res.status(200).json({
                            message: 'Handling GET requests to /games',
                            res: result.rows
                        });
                    };
                });
        });
});

// Exchange letters
router.post('/exchange_letters', (req, res, next) => {
    exchange_pr(req, res);
});

router.post('/create', (req, res, next) => {
    crear_tablero_sp(req, res);
});

async function crear_tablero_sp(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.CREAR_TABLERO_PR(:id, :pone, :ptwo);
         END;`,
            {
                id: req.body.id,
                pone: req.body.player_one,
                ptwo: req.body.player_two

            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: req.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}


async function exchange_pr(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        await connection.execute(
            `BEGIN
            TABLEROS_PKG.EXCHANGE_PR(:id, :username, :letter);
         END;`,
            {
                id: req.body.id,
                username: req.body.username,
                letter: req.body.letter

            },
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                res.status(200).json({
                    message: 'Handling GET requests to /games',
                    body: req.body
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}


module.exports = router;