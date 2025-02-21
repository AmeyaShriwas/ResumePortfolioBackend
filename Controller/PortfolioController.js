const PortfolioService = require("./../Services/PortfolioServices");
const Portfolio = require('./../Model/Portfolio')

exports.addPortfolio = async (req, res) => {
    try {
      console.log("Files Uploaded:", req.files);
      console.log("Form Data:", req.body);
  
      const { name, bio, linkedin, email, phone, skills } = req.body;
      const profilePhoto = req.files?.profilePhoto?.[0]?.path || null;
      const resume = req.files?.resume?.[0]?.path || null;
  
      // Parse projects JSON safely
      let projects = [];
      try {
        projects = JSON.parse(req.body.projects || "[]");
      } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid projects data format" });
      }
  
      // Add images to project details safely
      if (req.files.projectImages) {
        projects.forEach((project, index) => {
          if (req.files.projectImages[index]) {
            project.projectImage = req.files.projectImages[index].path;
          }
        });
      }
  
      const newPortfolio = {
        name,
        bio,
        linkedin,
        email,
        phone,
        skills,
        profilePhoto,
        resume,
        projects,
      };
  
      console.log("Final Portfolio Data:", newPortfolio);
      
      await Portfolio.create(newPortfolio);
  
      res.status(201).json({ status: true, message: "Portfolio added successfully", data: newPortfolio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  };
  
  
  

exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await PortfolioService.getAllPortfolios();
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await PortfolioService.getPortfolioById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
