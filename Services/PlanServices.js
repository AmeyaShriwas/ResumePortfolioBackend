const Plan = require("../Model/Plan");

// Create a new plan
const createPlan = async (data) => {
  return await Plan.create(data);
};

// Get all plans of a user
const getUserPlans = async (userId) => {
  return await Plan.find({ userId });
};

// Get a single plan by ID
const getPlanById = async (planId) => {
  return await Plan.findOne({userId: planId});
};

// Update a plan
const updatePlan = async (planId, data) => {
  return await Plan.findByIdAndUpdate(planId, data, { new: true });
};

// Delete a plan
const deletePlan = async (planId) => {
  return await Plan.findByIdAndDelete(planId);
};

module.exports = {
  createPlan,
  getUserPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
