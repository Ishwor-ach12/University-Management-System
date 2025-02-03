const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.route('/')
    .get(loginController.getLoginPage)
    .post(loginController.loginReq);

module.exports = router