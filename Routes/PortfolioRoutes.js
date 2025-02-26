const express = require("express");
const router = express.Router();
const upload = require("./../Middleware/Multer");
const PortfolioController = require("./../Controller/PortfolioController");
const AuthMiddleware = require('./../Middleware/Auth')

router.post(
    "/add", 
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "resume", maxCount: 1 },
      { name: "projectImages", maxCount: 10 } // Allow multiple images
    ]),
    PortfolioController.addPortfolio
  );
  
  router.post("/updateProfilePhoto/:id", AuthMiddleware, upload.fields([
    { name: "profilePhoto", maxCount: 1 }
]), PortfolioController.updatePortfolioPhoto);

router.post("/updatePersonalDetails/:id", AuthMiddleware, PortfolioController.updatePersonalDetails);

router.post(
  "/updateProjects", AuthMiddleware,
  upload.fields([
    { name: "projectImage", maxCount: 1 } // Allow multiple images
  ]),
  PortfolioController.updateProject
);
// Get All Portfolios
router.get("/all", PortfolioController.getAllPortfolios);

// Get Portfolio by ID
router.get("/:id", PortfolioController.getPortfolioById);

module.exports = router;
