const PortfolioService = require("./../Services/PortfolioServices");
const Portfolio = require('./../Model/Portfolio')
const jwt = require("jsonwebtoken");
const User = require("./../Model/UserModel");



exports.addPortfolio = async (req, res) => {
    try {
      console.log("Files Uploaded:", req.files);
      console.log("Form Data:", req.body);
  
      const { name, bio, tagLine, linkedin, email, phone, skills, userId } = req.body;
      const profilePhoto = req.files?.profilePhoto?.[0]?.path || null;
      const resume = req.files?.resume?.[0]?.path || null;
        const decoded = jwt.verify(userId, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        const id = user?._id; // Ensure you get the ObjectId
          
      // Parse projects JSON safely
      let projects = [];
      try {
        projects = JSON.parse(req.body.projects || "[]");
      } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid projects data format" });
      }

      let training_Experience = []
      try {
        training_Experience = JSON.parse(req.body.training_Experience || "[]");
      } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid experience data format" });
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
      id,
        name,
        bio,
        tagLine,
        linkedin,
        email,
        phone,
        skills,
        profilePhoto,
        resume,
        projects,
        training_Experience

      };
  
      console.log("Final Portfolio Data:", newPortfolio);
      
      await Portfolio.create(newPortfolio);
  
      res.status(201).json({ status: true, message: "Portfolio added successfully", data: newPortfolio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  };
  
  
  exports.updatePortfolioPhoto = async (req, res) => {
    try {
        const userId = req.params.id;
        const id = req.userId
        if(userId !== id){
          return res.status(401).json({
            status: false,
            message: 'Invalid user'
        });
        }

        // Handling file uploads
        const profilePhotoGet = req.files["profilePhoto"]
        if(!profilePhotoGet){
          return {status: false, message: 'Empty file'}
        }
        const profilePhoto = profilePhotoGet ? profilePhotoGet[0].path : null;
       
        // Update portfolio using service function
        const updatedPortfolio = await PortfolioService.updatePortfolio(userId,profilePhoto);

        return res.status(200).json({
            success: true,
            message: "Portfolio updated successfully",
            data: updatedPortfolio
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.updatePersonalDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const id = req.userId
    if(userId !== id){
      return res.status(401).json({
        status: false,
        message: 'Invalid user'
    });
    }
    const data = req.body;
    console.log('data', data)

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: "Empty data provided" });
    }

    // Update portfolio using service function
    const updatedPortfolio = await PortfolioService.updatePersonalDetails(userId, data);

    if (!updatedPortfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const id = req.userId
    if(userId !== id){
      return res.status(401).json({
        status: false,
        message: 'Invalid user'
    });
    }
    const data = req.body;
    const index = data.index; // Project index

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: "Empty data provided" });
    }

    if (index === undefined || index < 0) {
      return res.status(400).json({ success: false, message: "Invalid project index" });
    }

    // Handling file uploads
    const projectImageGet = req?.files["projectImage"];
    const projectImage = projectImageGet ? projectImageGet[0].path : null;

    // Update project
    const updatedPortfolio = await PortfolioService.updateProjectsDetails(userId, index, projectImage, data);

    if (!updatedPortfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedPortfolio
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Erroyr",
      error: error.message
    });
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
