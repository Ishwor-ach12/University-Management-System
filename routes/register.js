const express = require('express')
const registerController = require('../controller/registerController')
const router = express.Router()

router.route('/')
    .get(registerController.getRegisterPage)
    .post(registerController.createUniversity);
module.exports = router