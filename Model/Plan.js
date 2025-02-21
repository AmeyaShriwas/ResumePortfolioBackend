const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    planName: {
        type: String,
        enum: ["free", "rs1", "rs2"],
        default: "free"
    },
    startDate: Date,
    endDate: Date
});

// Assign a free plan by default when a new user is created
planSchema.statics.assignFreePlan = async function (userId) {
    return await this.create({
        userId,
        planName: "free",
        planStatus: "active"
    });
};

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
