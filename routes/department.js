const express = require('express')
const router = express.Router()
const departmentController = require('../controller/departmentController')
// const getUniversityDepartmentData = require('../models/getUniversityDepartmentData');
// const createDepartment = require('../models/createDepartment')
router.get('/:userType/:userId', async (req, res) => {
    departmentController.getDepartmentPage(req, res);
})

// router.post('/:userType/:userId', async (req, res)=>{
//     await createDepartment(req)
//     departmentController.getDepartmentPage(req, res);
// })

// router.get('/:userType/:userId/api/departments', async (req, res)=>{
//     data = await getUniversityDepartmentData(req.params.userId.split(".")[1]);
//     res.json(data);
// })
module.exports = router