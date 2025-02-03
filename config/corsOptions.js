const whiteList = [
    'https://www.mysite.com',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://0.0.0.0:5000'
]
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions