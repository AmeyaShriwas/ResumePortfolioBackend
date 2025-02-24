const express = require("express");
const router = express.Router();
const upload = require("./../Middleware/Multer");
const PortfolioController = require("./../Controller/PortfolioController");

router.post(
    "/add", 
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "resume", maxCount: 1 },
      { name: "projectImages", maxCount: 10 } // Allow multiple images
    ]),
    PortfolioController.addPortfolio
  );
  
  router.post("/updateProfilePhoto/:id", upload.fields([
    { name: "profilePhoto", maxCount: 1 }
]), PortfolioController.updatePortfolioPhoto);
// Get All Portfolios
router.get("/all", PortfolioController.getAllPortfolios);

// Get Portfolio by ID
router.get("/:id", PortfolioController.getPortfolioById);

module.exports = router;
