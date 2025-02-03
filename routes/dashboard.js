const express = require('express')
const router = express.Router()
const dashboardController = require('../controller/dashboardController')
router.get('/:userType/:userId', async (req, res) => {
    dashboardController.getDashboardPage(req, res);
})

module.exports = router