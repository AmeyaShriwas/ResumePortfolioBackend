const Portfolio = require("./../Model/Portfolio");

exports.createPortfolio = async (data) => {
  return await Portfolio.create(data);
};

exports.getAllPortfolios = async () => {
  return await Portfolio.find();
};

exports.getPortfolioById = async (id) => {
  return await Portfolio.findOne({id: id});
};
