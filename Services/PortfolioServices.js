const Portfolio = require("./../Model/Portfolio");

exports.createPortfolio = async (data) => {
  return await Portfolio.create(data);
};

exports.updatePortfolio = async (userId, profilePhoto) => {
  try {
      const portfolio = await Portfolio.findOne({ id: userId }); // Use findOne instead of find
      if (!portfolio) {
          throw new Error("Portfolio not found");
      }

      if (profilePhoto) portfolio.profilePhoto = profilePhoto;
      await portfolio.save();
      return portfolio;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.updateProjectsDetails = async (userId, index, projectImage, data) => {
  try {
   
    const portfolio = await Portfolio.findOne({ id: userId });
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (index >= portfolio.projects.length) {
      throw new Error("Project index out of range");
    }

    let project = portfolio.projects[index];

    // Update only the fields that are provided
    project.projectName = data.projectName || project.projectName;
    project.projectDescription = data.projectDescription || project.projectDescription;
    project.projectImage = projectImage || project.projectImage;
    project.techStack = data.techStack || project.techStack;
    project.liveLink = data.liveLink || project.liveLink;
    project.githubLink = data.githubLink || project.githubLink;

    // Save updated portfolio
    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.updatePersonalDetails = async (userId, data) => {
  try {
    const portfolio = await Portfolio.findOne({ id: userId }); // Use _id if it's MongoDB default
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Updating fields safely
    portfolio.name = data.name || portfolio.name;
    portfolio.tagLine = data.tagLine || portfolio.tagLine;
    portfolio.linkedin = data.linkedin || portfolio.linkedin;
    portfolio.email = data.email || portfolio.email;

    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};



exports.updateBioDetails = async (userId, data) => {
  try {
    const portfolio = await Portfolio.findOne({ id: userId }); // Use _id if it's MongoDB default
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Updating fields safely
    portfolio.bio = data.bio || portfolio.bio;
    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSkillsDetails = async (userId, data) => {
  try {
    const portfolio = await Portfolio.findOne({ id: userId }); // Use _id if it's MongoDB default
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Updating fields safely
    portfolio.skills = data.skills || portfolio.skills;
    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.getAllPortfolios = async () => {
  return await Portfolio.find();
};

exports.getPortfolioById = async (id) => {
  return await Portfolio.findOne({id: id});
};
