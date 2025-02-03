const createUser = async (data)=>{
    const mysql = require("mysql");
    const bcrypt = require('bcrypt')
    const {format} = require('date-fns')
    const getDetails = require('./getDetails')
    const deleteRecord = require('./deleteRecord');
    const createFullSchema = require('./createFullSchema')

    fetchedData = await getDetails(data.email)
    const pwd = data.password;

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
        const subscriptionStartDate = `${format(new Date(), 'yyyy-MM-dd')}`;
        const sql = "INSERT INTO users (nameOfInstitute, userId, pswd, country, state, city, email, phone, plan, subscriptionStartDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [fetchedData.nameOfInstitute, data.userId, pwd, fetchedData.country, fetchedData.state, fetchedData.city, data.email, fetchedData.phone, fetchedData.plan, subscriptionStartDate]
        con.query(sql, values, async function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          } else {
            await createFullSchema(data.userId);
            await deleteRecord(data.email);
            // resolve(null);
          }
        });
        const sql2 = "INSERT INTO loginDetails (userId, pswd, userType) VALUES (?, ?, ?)";
        const values2 = [data.userId, pwd, "universityAdmin"]
        con.query(sql2, values2, async function (err, result) {
          if (err) {
            console.error("Error executing query: " + err);
            reject(err);
          }
        });
        resolve(null)
        return;

        con.end(); 
      });
    });
}
module.exports = createUser