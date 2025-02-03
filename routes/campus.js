const express = require('express')
const router = express.Router()
const campusController = require('../controller/campusController')
const getUniversityCampusData = require('../models/getUniversityCampusData');
const createCampus = require('../models/createCampus')
router.get('/:userType/:userId', async (req, res) => {
    campusController.getCampusPage(req, res);
})

router.post('/:userType/:userId', async (req, res)=>{
    await createCampus(req)
    campusController.getCampusPage(req, res);
})

router.get('/:userType/:userId/api/campuses', async (req, res)=>{
    data = await getUniversityCampusData(req.params.userId.split(".")[1]);
    res.json(data);
})
module.exports = router