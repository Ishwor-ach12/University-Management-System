const createFullSchema = async (req)=>{
    const mysql = require("mysql");
    let campusCode;

    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: req.params.userId.split('.')[1]
    });
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
        let sql = `SELECT campusCode from Campus`;
        con.query(sql, async function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
                let max = 0;
                for (let i = 0; i < result.length; i++) {
                    let tempNum = "";
                    for (let j = 0; j < result[i].campusCode.length; j++) {
                        if (result[i].campusCode[j] >= 0 && result[i].campusCode[j] <= 9) {
                            tempNum += result[i].campusCode[j];
                        }
                    }
                    if (parseInt(tempNum) >= max) {
                        max = parseInt(tempNum);
                    }
                }
                campusCode = 'C' + (max+1)
                sql = `INSERT INTO Campus VALUES (?,?,?,?,?)`;
                values = [req.body.campusName, campusCode, req.body.country, req.body.state, req.body.city]
                con.query(sql, values, async function (err, result) {
                  if (err) {
                    console.error("Error executing query: " + err);
                    reject(err);
                  } else {
                    resolve(true)
                  }
          
                  con.end(); 
                });
          }
        });
      });
    });
}
module.exports = createFullSchema