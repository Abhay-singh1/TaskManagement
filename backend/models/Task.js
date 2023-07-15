const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },

    description:{
        type:String,
        required:true,
    },

    dueDate:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        required:true,
        default:'Pending'
    },

    userID:{
        type:String,
        required:true,
    }
})

module.exports = Tasks = mongoose.model('Task', TaskSchema)