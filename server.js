require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const { logger } = require('./middlewares/logEvents')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
// const mongoose = require('mongoose')
// const connectDB = require('./config/dbConn')
const sql = require('./config/dbInsert')

const indexRoute = require('./routes/index')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const confirmRegister = require('./routes/confirmRegister')
const dashboardRoute = require('./routes/dashboard')
const campusRoute = require('./routes/campus')
const departmentRoute = require('./routes/department')


// connectDB();
sql();

app.use(logger)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(ejsLayouts)
app.use(express.static('public'))

app.use('/', indexRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/confirmRegister', confirmRegister)
app.use('/dashboard', dashboardRoute)
app.use('/campuses', campusRoute)
app.use('/departments', departmentRoute)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout', 'layouts/universityLayout')
app.set("layout setPassword", false)
// app.set("layout universityLayout", 'layouts/universityLayout')

// app.use('*',errorHandler)

// mongoose.connection.once('open', ()=>{
//     console.log('Connected to MongoDB')
// })
app.listen(process.env.PORT || 5000)