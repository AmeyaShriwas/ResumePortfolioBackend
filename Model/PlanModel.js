const mongoose = require('mongoose')

const planSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
     planStatus: {
        type: String,
        enum: ["active, inactive"],
        default:'inactive'
     },
     planName: {
        type: String,
        enum: ['free', 'PlanA'],
        default: 'free'
     },
     startDate: Date,
     endDate: Date
})

const Plan = mongoose.model('plan', planSchema )
module.exports = Plan