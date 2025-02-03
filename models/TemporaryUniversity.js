function createTempUni(udata) {

    const mysql = require('mysql');
    const { format } = require('date-fns')

    let con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: process.env.SQL_PASSWORD,
        database: "tempDB"
    });

    con.connect((err) => {
        if (err) throw err;
        var sql = 'INSERT INTO tempUni (nameOfInstitute, country, state, city, email, phone, plan, tracker) VALUES (?,?,?,?,?,?,?,?)';
        plan = udata.plan
        tracker = Buffer.from(udata.email).toString('base64')
        // subscriptionStartDate = `${format(new Date(), 'yyyy-MM-dd')}`;
        values = [udata.nameOfInstitute, udata.country, udata.state, udata.city, udata.email,udata.mobileNumber, plan, tracker]
        con.query(sql, values, function (err, result) {
            if (err) console.log("couldn't insert" + err);
            else{
                 console.log("1 record inserted");
            }
        });
        con.end();
    });
}

module.exports = createTempUni