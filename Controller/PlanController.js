const Plan  = require('../Model/Plan')

// Create Plan
const createPlan = async (req, res) => {
    try {
      const plan = await planService.createPlan(req.body);
      res.status(201).json({ success: true, data: plan });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get User Plans
  const getUserPlans = async (req, res) => {
    try {
      const plans = await planService.getUserPlans(req.params.userId);
      res.status(200).json({ success: true, data: plans });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Get Plan by ID
  const getPlanById = async (req, res) => {
    try {
      const plan = await planService.getPlanById(req.params.id);
      if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });
  
      res.status(200).json({ success: true, data: plan });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Update Plan
  const updatePlan = async (req, res) => {
    try {
      const updatedPlan = await planService.updatePlan(req.params.id, req.body);
      if (!updatedPlan) return res.status(404).json({ success: false, message: "Plan not found" });
  
      res.status(200).json({ success: true, data: updatedPlan });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Delete Plan
  const deletePlan = async (req, res) => {
    try {
      const deletedPlan = await planService.deletePlan(req.params.id);
      if (!deletedPlan) return res.status(404).json({ success: false, message: "Plan not found" });
  
      res.status(200).json({ success: true, message: "Plan deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = {
    createPlan,
    getUserPlans,
    getPlanById,
    updatePlan,
    deletePlan,
  };