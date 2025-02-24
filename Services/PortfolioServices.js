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

exports.updatePersonalDetails = async(userId, data)=> {
  try{
    const portfolio = await Portfolio.findOne({ id: userId }); // Use findOne instead of find
      if (!portfolio) {
          throw new Error("Portfolio not found");
      }

        portfolio.name = data.name || portfolio.name,
        portfolio.bio = data.bio || portfolio.bio

        portfolio.linkedin = data.linkedin || portfolio.linkedin
        portfolio.email = data.email || portfolio.email
        await portfolio.save();
        return portfolio;

  }catch(error){
    throw new Error(error.message)
  }
}

exports.getAllPortfolios = async () => {
  return await Portfolio.find();
};

exports.getPortfolioById = async (id) => {
  return await Portfolio.findOne({id: id});
};
