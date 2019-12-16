const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT USERNAME FROM TBL_USER';

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
                            message: 'Handling GET requests to /users',
                            res: result.rows
                        });
                    };
                });
        });
});

router.post('/register', (req, res, next) => {
    run(req, res);
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const query = `SELECT * FROM TBL_USER WHERE USERNAME = '${id}'`;

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
                            message: 'Handling GET requests to /users',
                            res: result.rows
                        });
                    };
                });
        });

});

async function run(req, res) {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      
      const result = await connection.execute(
        `BEGIN
           SP_REGISTER(:i);
         END;`,
        {
          i:  req.body.username
        },
        { autoCommit: true }
      );
  
      console.log(result.outBinds);
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          res.status(200).json({
            message: 'Handling GET requests to /users',
            body: req.body
        });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

module.exports = router;