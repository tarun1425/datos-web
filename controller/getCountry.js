const db = require('../models/db');

module.exports.getC = (req, res, next) => {
    sql = `select DISTINCT country from contact order by country`;
    db.query(sql,(err, rows, fields) => {
        if (err) {
            throw err;
        } else {
            res.send(rows);
        }
    });

}

