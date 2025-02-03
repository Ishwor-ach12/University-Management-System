const getEmail = async (tracker)=>{
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
  
        const sql = "SELECT nameOfInstitute, email, tracker FROM tempUni";
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            for (let i = 0; i < result.length; i++) {
              if (result[i].tracker === tracker) {
                email = result[i].email
                resolve(email)
                return;
              }
            }
            resolve(null);
          }
  
          con.end(); 
        });
      });
    });
}
module.exports = getEmail