// const getCampusCount = require('../models/getCampusCount');
// const getUniversityCampusData = require('../models/getUniversityCampusData')

const getDepartmentPage = async (req, res) => {
    if(req.params.userType === "universityAdmin"){
        res.render('../views/universityViews/department',{layout: 'layouts/universityLayout'});
    }

}

module.exports = {getDepartmentPage};