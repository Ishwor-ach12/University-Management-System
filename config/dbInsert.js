function checkSqlConnection(/* udata, val */) {
    const mysql = require('mysql');

    let con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "MOHIT1122334455",
        database: "tempDB"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.end();
    });
}
module.exports = checkSqlConnection
