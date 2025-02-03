const getDetails = async (userId)=>{
    const mysql = require("mysql");
  
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "CompanyDB"
    });
  
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
  
        const sql = `SELECT userType FROM loginDetails where userId = '${userId}'`;
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            resolve(result[0].userType);
          }
  
          con.end(); 
        });
      });
    });
}
module.exports = getDetails