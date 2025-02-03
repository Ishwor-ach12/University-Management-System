// async function verifyRegistration(tracker) {
//   const mysql = require("mysql");

//   let con = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: process.env.SQL_PASSWORD,
//     database: "tempDB",
//   });

//   await con.connect(async (err) => {
//     if (err) throw err;
//     var sql = "SELECT email, tracker FROM tempUni";
//     const result = await new Promise((resolve, reject) => {
//       con.query(sql, function (err, result) {
//         if (err) {
//           console.log("cannot retrieve data " + err);
//           reject(err);
//         } else {
//           resolve(result);
//           con.end();
//         }
//       });

//       // await con.query(sql, function (err, result) {
//       //     if (err) console.log("couldn't insert" + err);
//       //     else{
//       //          for(i = 0; i< result.length; i++){
//       //             if(result[i].tracker === tracker){
//       //                 console.log(tracker)
//       //                 return tracker;
//       //             }
//       //          }
//       //          return null;
//       //     }
//       // });
//     });
//     for (i = 0; i < result.length; i++) {
//       if (result[i].tracker === tracker) {
//         return tracker;
//       }
//     }
//   });
// }
// module.exports = verifyRegistration;
async function verifyRegistration(tracker) {
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
  
        const sql = "SELECT email, tracker FROM tempUni";
        con.query(sql, function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            for (let i = 0; i < result.length; i++) {
              if (result[i].tracker === tracker) {
                resolve(tracker);
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
  module.exports= verifyRegistration