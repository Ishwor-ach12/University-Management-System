const getUniversityDashboardData = require('../models/getUniversityDashboardData')

const getDashboardPage = async (req, res) => {
    if(req.params.userType === "universityAdmin"){
        id = req.params.userId.split(".")[1]
        arr = await getUniversityDashboardData(id);
        data = {
            'totalStudents': arr[0],
            'totalTeachers': arr[1],
            'totalCourses': arr[2],
            'totalCampuses': arr[3]
        }
        res.render('../views/universityViews/dashboard',{layout: 'layouts/universityLayout', data});
    }

}

module.exports = {getDashboardPage};