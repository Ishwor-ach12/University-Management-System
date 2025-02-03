const getCampusCount = async (userId) => {
    const mysql = require("mysql");
  
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: `${userId}`,
    });
    return new Promise( (resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
        let sql = "SELECT count(campusCode) as count FROM Campus";
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } 
          else {
            resolve(result);
          }
        });
        con.end();
      });
    });
  };
  module.exports = getCampusCount;
  