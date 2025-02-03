const getUserId = async (tracker) => {
  const mysql = require("mysql");
  const getName = require("../models/getName");
  nameOfInstitute = await getName(tracker);

  const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "CompanyDB",
  });

  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error("Error connecting to database: " + err);
        reject(err);
        return;
      }

      const sql = "SELECT userId FROM users";
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error executing query: " + err);
          reject(err);
        } else {
          let str = nameOfInstitute.toUpperCase().split(" ");
          let unicode = "UNI.";
          for (let i = 0; i < str.length; i++) {
            unicode += str[i][0];
          }
          
          let max = 0;
          for (let i = 0; i < result.length; i++) {
            let tempNum = "";
            for (let j = 0; j < result[i].userId.length; j++) {
              if (result[i].userId[j] >= 0 && result[i].userId[j] <= 9) {
                tempNum += result[i].userId[j];
              }
            }
            if (parseInt(tempNum) >= max) {
              max = parseInt(tempNum);
            }
          }
          unicode += (max + 1);
          resolve(unicode);
          return;
        }
        resolve(null);
        con.end();
      });
    });
  });
};
module.exports = getUserId;
