const PortfolioService = require("./../Services/PortfolioServices");

exports.addPortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    
    // Add uploaded file paths
    if (req.files) {
      if (req.files.profilePhoto) {
        portfolioData.profilePhoto = req.files.profilePhoto[0].path;
      }
      if (req.files.resume) {
        portfolioData.resume = req.files.resume[0].path;
      }
      if (req.files["projects[].projectImage"]) {
        portfolioData.projects.forEach((project, index) => {
          project.projectImage = req.files["projects[].projectImage"][index]?.path || null;
        });
      }
    }

    const newPortfolio = await PortfolioService.createPortfolio(portfolioData);
    res.status(201).json({ success: true, message: "Portfolio added successfully", data: newPortfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
