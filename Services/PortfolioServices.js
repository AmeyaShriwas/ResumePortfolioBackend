const Portfolio = require("./../Model/Portfolio");

exports.createPortfolio = async (data) => {
  return await Portfolio.create(data);
};

exports.updatePortfolio = async (userId, formData, profilePhoto, resume, projectImages) => {
  try {
      const portfolio = await Portfolio.findById(userId);
      if (!portfolio) {
          throw new Error("Portfolio not found");
      }

      // Update portfolio fields
      portfolio.name = formData.name || portfolio.name;
      portfolio.bio = formData.bio || portfolio.bio;
      portfolio.linkedin = formData.linkedin || portfolio.linkedin;
      portfolio.skills = formData.skills || portfolio.skills;
      portfolio.email = formData.email || portfolio.email;
      portfolio.phone = formData.phone || portfolio.phone;

      if (profilePhoto) portfolio.profilePhoto = profilePhoto;
      if (resume) portfolio.resume = resume;

      // Update projects
      if (formData.projects) {
          const projects = JSON.parse(formData.projects); // Convert string to JSON
          projects.forEach((proj, index) => {
              if (portfolio.projects[index]) {
                  portfolio.projects[index].projectName = proj.projectName;
                  portfolio.projects[index].projectDescription = proj.projectDescription;
                  portfolio.projects[index].techStack = proj.techStack;
                  portfolio.projects[index].liveLink = proj.liveLink;
                  portfolio.projects[index].githubLink = proj.githubLink;
                  if (projectImages[index]) {
                      portfolio.projects[index].projectImage = projectImages[index];
                  }
              }
          });
      }

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
