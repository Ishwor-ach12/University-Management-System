const createFullSchema = async (userId)=>{
    const mysql = require("mysql");
    const createTables = require('./createTables')
  
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
    });
  
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
        const databaseName = userId.split(".")[1]
        const sql = `CREATE DATABASE ${databaseName}`;
        con.query(sql, async function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            await createTables(databaseName)
            resolve(null);
          }
  
          con.end(); 
        });
      });
    });
}
module.exports = createFullSchema