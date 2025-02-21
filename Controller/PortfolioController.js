const PortfolioService = require("./../Services/PortfolioServices");

exports.addPortfolio = async (req, res) => {
    try {
      const { body, files } = req;
      
      // Extract personal data
      const personalData = {
        name: body.name,
        bio: body.bio,
        linkedin: body.linkedin,
        skills: body.skills,
        email: body.email,
        phone: body.phone,
        profilePhoto: files.profilePhoto ? files.profilePhoto[0].path : null,
        resume: files.resume ? files.resume[0].path : null,
      };
  
      // Extract projects
      const projects = JSON.parse(body.projects || "[]"); // Ensure projects are parsed
      projects.forEach((project, index) => {
        if (files.projectImages && files.projectImages[index]) {
          project.projectImage = files.projectImages[index].path;
        }
      });
  
      // Save to Database (Example)
      const portfolio = new PortfolioModel({ personalData, projects });
      await portfolio.save();
  
      res.status(201).json({ status: true, message: "Portfolio added successfully" });
    } catch (error) {
      console.error("Error adding portfolio:", error);
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
