const path = require('path')
const verifyLink = require('../models/verifyRegistration')
const getUserId = require("./getUserId")
const getEmail = require('../models/getEmail')
const createUser = require('../models/createUser')

// const userDB = {
//     users: require("../models/users.json"),
//     setUser: function (data) {
//       this.users = data;
//     },
//   };  

// const newUserHandler = async (req, res) => {
//     const { usr, pwd } = req.body;
//     if (!usr || !pwd) {
//       return res
//         .status(400)
//         .json({ message: "username and password are required" });
//     }
//     const duplicate = userDB.users.find((person) => person.userId === usr);
//     if (duplicate) {
//       return res.sendStatus(209);
//     }
//     try {
//       const hashedPwd = await bcrypt.hash(pwd, 10);
//       newUser = {
//         userId: usr,
//         password: hashedPwd,
//       };
//       userDB.setUser([...userDB.users, newUser]);
//       await fsPromises.writeFile(
//         path.join(__dirname, "..", "models", "users.json"),
//         JSON.stringify(userDB.users)
//       );
//       console.log(userDB.users);
//       res.status(201).json({'success': 'new user created'})
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };

const getPasswordPage = async (req, res)=>{
  const returnedTracker =await verifyLink(req.params.tracker)
  if(returnedTracker === req.params.tracker){
    data = {
      userId: await getUserId(returnedTracker),
      email: await getEmail(returnedTracker)
    }
    res.render(path.join(__dirname, "../views/setPassword.ejs"), {layout: 'setPassword', data});
  }
  else
    res.json({'authorization error': 'This link is not available'})
}

const createNewUser = async (req, res) =>{
  await createUser(req.body)
  res.sendFile(path.join(__dirname, '../views/login.html'))
}

module.exports = {getPasswordPage, createNewUser}