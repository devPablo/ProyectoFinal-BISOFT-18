const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('./db-oracle');

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM EMPLEADOS';
    
    oracledb.getConnection(
        dbConfig,
        (err, connection) =>
        {
          if (err) { console.error(err); return; }
          connection.execute(
            query,
            function(err, result)
            {
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

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: 'Handling POST requests to /users',
        body: req.body
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const query = `SELECT * FROM EMPLEADOS WHERE IDEMP = ${id}`;

    oracledb.getConnection(
        dbConfig,
        (err, connection) =>
        {
          if (err) { console.error(err); return; }
          connection.execute(
            query,
            function(err, result)
            {
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

module.exports = router;