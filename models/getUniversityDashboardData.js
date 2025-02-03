const getUniversityDashboardData = async (userId) => {
  const mysql = require("mysql");

  const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: `${userId}`,
  });
  arr = [];
  return new Promise( (resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error("Error connecting to database: " + err);
        reject(err);
        return;
      }
      let sql = "SELECT count(studentId) as totalStudent FROM Student";
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error executing query: " + err);
          reject(err);
        } else {
          totalStudents = result[0].totalStudent;
          arr.push(totalStudents);
        }
      });
      sql =
        "SELECT count(staffId) as totalTeacher FROM Staff where staffType = 'Teaching'";
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error executing query: " + err);
          reject(err);
        } else {
          totalTeachers = result[0].totalTeacher;
          arr.push(totalTeachers);
        }
      });
      sql = "SELECT count(courseId) as totalCourse FROM Course";
      con.query(sql, function (err, result) {
        if (err) {
          console.error("Error executing query: " + err);
          reject(err);
        } else {
          totalCourses = result[0].totalCourse;
          arr.push(totalCourses);
        }
      });
      sql = "SELECT count(campusCode) as totalCampus FROM Campus";
      con.query(sql, function (err, result) {
        if (err) {
          console.log("hi");
          console.error("Error executing query: " + err);
          reject(err);
        } else {
          totalCampuses = result[0].totalCampus;
          arr.push(totalCampuses);
        }
        resolve(arr);
      });
      con.end();
      /*     data = {
        'totalStudents': arr[0],
        'totalTeachers': arr[1],
        'totalCourses': arr[2],
        'totalCampuses': arr[3]
    }
    //   console.log(totalCourses, totalStudents, totalTeachers)
    console.log(data) */
    });
  });
};
module.exports = getUniversityDashboardData;
