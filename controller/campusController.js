const getCampusCount = require('../models/getCampusCount');
const getUniversityCampusData = require('../models/getUniversityCampusData')

const getCampusPage = async (req, res) => {
    if(req.params.userType === "universityAdmin"){
        id = req.params.userId.split(".")[1]
        arr = await getCampusCount(id);
        data = arr[0]
        res.render('../views/universityViews/campus',{layout: 'layouts/universityLayout', data});
    }

}

module.exports = {getCampusPage};