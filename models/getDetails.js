const getDetails = async (email)=>{
    const mysql = require("mysql");
  
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "tempDB",
    });
  
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
  
        const sql = `SELECT * FROM tempUni where email = '${email}'`;
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
                if (result.length > 0) {
                    resolve(result[0])
                    return;
                }
            resolve(null);
          }
  
          con.end(); 
        });
      });
    });
}
module.exports = getDetails