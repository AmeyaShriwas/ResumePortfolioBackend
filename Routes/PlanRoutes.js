const express = require('express')
const Router = express.Router()
const planController = require('../Controller/PlanController')
const AuthMiddleware =  require('./../Middleware/Auth')

Router.post('/createPlan', AuthMiddleware,  planController.createPlan )
Router.get("/user/:userId", planController.getUserPlans);
Router.get("/:id", planController.getPlanById);
Router.put("/:id", planController.updatePlan);
Router.delete("/:id", planController.deletePlan);

module.exports = Router
