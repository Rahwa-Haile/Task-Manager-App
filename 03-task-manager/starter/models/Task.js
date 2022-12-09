const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    // name: String,
    // completed: Boolean

    name : {
        type: String,
        required: [true, 'Cannot submit empty values'],
        trim: true,
        maxLength : [20, 'name is too long']
    },

    completed: {
        type: Boolean,
        default: false
    }
}) 


module.exports = mongoose.model('Task', TaskSchema)