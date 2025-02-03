const mongoose = require('mongoose')
const Schema = mongoose.Schema

const universitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    email : {
        type: String,
        required: true
    },
    plan: {
        type : Number,
        required: true
    },
    subscriptionStartDate:{
        type: Date,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})