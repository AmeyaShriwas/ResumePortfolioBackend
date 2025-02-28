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

exports.addMoreProjects = async(userId, projectImage, data)=> {
  try{
    const portfolio = await Portfolio.findOne({ id: userId });
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    const newProject = {
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      projectImage: projectImage,
      techStack: data.techStack,
      liveLink: data.liveLink,
      githubLink: data.githubLink
    };

    // Push the new project into the projects array
    portfolio.projects.push(newProject);

    // Save the updated portfolio
    await portfolio.save();

    return portfolio;
  }
  catch(error){
    throw new Error(error.message);
  }
}

exports.deleteProject = async (userId, index) => {
  try {
    const portfolio = await Portfolio.findOne({ id: userId });
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Check if projects array exists and index is valid
    if (!portfolio.projects || index < 0 || index >= portfolio.projects.length) {
      throw new Error("Invalid project index");
    }

    // Remove the project at the given index
    portfolio.projects.splice(index, 1);

    // Save the updated portfolio
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

exports.deleteExperienceDetails = async(userId, index)=> {
  try{
    const portfolio = await Portfolio.findOne({ id: userId });
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Check if projects array exists and index is valid
    if (!portfolio.projects || index < 0 || index >= portfolio.projects.length) {
      throw new Error("Invalid experience index");
    }

    // Remove the project at the given index
    portfolio.training_Experience.splice(index, 1);

    // Save the updated portfolio
    await portfolio.save();

    return portfolio;
  }
  catch(error){
    throw new Error(error.message);

  }
}

exports.addExperienceDetails = async(userId, data)=> {
  try{
    const portfolio = await Portfolio.findOne({ id: userId }); // Use _id if it's MongoDB default
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    const newExperience = {
      training_company:data.training_company,
    course_job : data.course_job,
    from : data.from,
    to : data.to,
    description : data.description
    }
    await portfolio.training_Experience.push(newExperience)

    await portfolio.save();
    return portfolio;
  }
  catch(error){
    throw new Error(error.message);
  }
}

exports.updateExperienceDetails = async (userId, index,  data) => {
  try {
    const portfolio = await Portfolio.findOne({ id: userId }); // Use _id if it's MongoDB default
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (index >= portfolio.training_Experience.length) {
      throw new Error("Project index out of range");
    }
    let experience = portfolio.training_Experience[index];

    experience.training_company = data.training_company || experience.training_company;
    experience.course_job = data.course_job || experience.course_job;
    experience.from = data.from || experience.from;
    experience.to = data.to || experience.to;
    experience.description = data.description || experience.description;

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
