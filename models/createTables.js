const createTables = async (databaseName)=>{
    const mysql = require("mysql");
  
    const con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: databaseName,
    });
  
    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to database: " + err);
          reject(err);
          return;
        }
        const sql = ['CREATE TABLE Campus (campusName varchar(255) NOT NULL,campusCode varchar(5) primary key,country varchar(56) NOT NULL,state varchar(255) NOT NULL,city varchar(255) NOT NULL)','CREATE TABLE Department (departmentName varchar(255) NOT NULL, departmentCode varchar(5), campusCode varchar(5), departmentHead varchar(255), constraint pk_key primary key(departmentCode, campusCode), foreign key(campusCode) references Campus(campusCode) on delete cascade on update cascade)','CREATE TABLE Course (courseName varchar(255) NOT NULL, courseId varchar(20), campusCode varchar(5), departmentCode varchar(5) NOT NULL, credits float NOT NULL, constraint pk_key primary key(campusCode, courseId), foreign key(departmentCode) references Department(departmentCode) on delete cascade on update cascade, foreign key(campusCode) references Campus(campusCode) on delete cascade on update cascade, index(courseId))','CREATE TABLE Staff (staffName varchar(255) NOT NULL, staffId varchar(30), departmentCode varchar(5), date_of_birth date, country varchar(56) NOT NULL,state varchar(255) NOT NULL,city varchar(255) NOT NULL, salary float, gender char(1), staffType varchar(20) NOT NULL, constraint pk_key primary key(staffId), foreign key(departmentCode) references Department(departmentCode) on delete set null on update cascade)','CREATE TABLE Student (studentName varchar(255) NOT NULL, studentId varchar(30), date_of_birth date NOT NULL, country varchar(56) NOT NULL,state varchar(255) NOT NULL,city varchar(255) NOT NULL, enrolledYear date NOT NULL, gender char(1), departmentCode varchar(5) NOT NULL, degree varchar(5) NOT NULL, semester int NOT NULL, section char(1), constraint pk primary key(studentId), foreign key(departmentCode) references Department(departmentCode) on delete cascade on update cascade)','CREATE TABLE Teaching (staffId varchar(30) NOT NULL, courseId varchar(20) NOT NULL, semester int NOT NULL, section char(1) NOT NULL,constraint fk foreign key(staffId)references Staff(staffId) on delete cascade on update cascade, foreign key(courseId) references Course(courseId) on delete cascade on update cascade)','CREATE TABLE student_phone(studentId varchar(30), phoneNumber int(10), foreign key(studentId) references Student(studentId) on delete cascade on update cascade)','CREATE TABLE student_email(studentId varchar(30), email varchar(255), foreign key(studentId) references Student(studentId) on delete cascade on update cascade)','CREATE TABLE staff_phone(staffId varchar(30), phoneNumber int(10), foreign key(staffId) references Staff(staffId) on delete cascade on update cascade)','CREATE TABLE staff_email(staffId varchar(30), email varchar(255), foreign key(staffId) references Staff(staffId) on delete cascade on update cascade)','alter table Department add constraint fk_key foreign key(departmentHead)references Staff(staffId) on delete set null on update cascade']
        for(let i = 0; i < sql.length; i++){
          con.query(sql[i], function (err, result) {
            if (err) {
              console.error("Error executing query: " + err);
              reject(err);
            } else {
            }
            
          });
        }
        resolve(null);
        con.end(); 
      });
    });
}
module.exports = createTables