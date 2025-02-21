const express = require("express");
const router = express.Router();
const upload = require("./../Middleware/Multer");
const PortfolioController = require("./../Controller/PortfolioController");
const AuthMiddleware = require('./../Middleware/Auth')

router.post(
    "/add", AuthMiddleware,
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "resume", maxCount: 1 },
      { name: "projectImages", maxCount: 10 } // Allow multiple images
    ]),
    PortfolioController.addPortfolio
  );
  
  
// Get All Portfolios
router.get("/all", PortfolioController.getAllPortfolios);

// Get Portfolio by ID
router.get("/:id", PortfolioController.getPortfolioById);

module.exports = router;
