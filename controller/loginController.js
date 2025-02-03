const path = require('path')
const checkUserType = require('../models/checkUserType')
const checkpass = require('../models/checkpass')

const getLoginPage = (req, res) =>{
    res.sendFile(path.join(__dirname, '../views/login.html'))
}

const loginReq = async (req, res)=>{
    userType = await checkUserType(req.body.userId)
    if(userType === null){
        res.sendFile(path.join(__dirname, '../views/login.html'))
    }else{
        if(await checkpass(req.body)){
            res.redirect(`/dashboard/${userType}/${req.body.userId}`);
        }else{
            res.sendFile(path.join(__dirname, '../views/login.html'))
        }
    }
}

module.exports = {
    getLoginPage,
    loginReq
}