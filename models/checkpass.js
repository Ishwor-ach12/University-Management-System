const getDetails = async (incomingUser)=>{
    const mysql = require("mysql");
    const bcrypt = require('bcrypt')
    const incomingUserId = incomingUser.userId
    const incomingPassword = incomingUser.password
    
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
  
        const sql = `SELECT userId, pswd FROM loginDetails where userId = '${incomingUserId}'`;
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            if(result.length === 0){
              
                resolve(null);
            }else if(result[0].pswd !== incomingPassword){
                resolve(false);
            }else if(result[0].userId === incomingUserId && result[0].pswd === incomingPassword){
                resolve(true);
            }else{
                resolve(false);
            }
          }
  
          con.end(); 
        });
      });
    });
}
module.exports = getDetails