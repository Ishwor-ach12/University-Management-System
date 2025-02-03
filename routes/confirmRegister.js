const express = require('express')
const router = express.Router()
const confirmRegisterController = require('../controller/confirmRegister')

router.post('/', (req, res)=>{
    confirmRegisterController.createNewUser(req, res)
    // res.json({'new': 'new user created'})
})

router.get('/:tracker', (req, res)=>{
    // console.log(req.params)
    confirmRegisterController.getPasswordPage(req, res)
})

module.exports = router