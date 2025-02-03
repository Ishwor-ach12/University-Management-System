const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI3);
    }catch(err){
        console.error(err)
    }
}
module.exports = connectDB
