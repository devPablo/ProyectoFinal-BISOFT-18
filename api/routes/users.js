const express = require('express');
const router = express.Router();

var oracledb = require('oracledb');



function execOracle(data) {
    oracledb.getConnection(
        {
          user          : "bd2",
          password      : "bd2",
          connectString : "localhost/XE"
        },
        function(err, connection)
        {
          if (err) { console.error(err); return; }
          connection.execute(
            data,
            function(err, result)
            {
              if (err) { console.error(err); return; }
               return result.rows;
            });
        });
}

router.get('/', (req, res, next) => {
    let query = 'SELECT * FROM EMPLEADOS';
    oracledb.getConnection(
        {
          user          : "bd2",
          password      : "bd2",
          connectString : "localhost/XE"
        },
        function(err, connection)
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
    res.status(200).json({
        message: 'Handling POST requests to /users'
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

module.exports = router;