const Portfolio = require("../models/PortfolioModel");

exports.createPortfolio = async (data) => {
  return await Portfolio.create(data);
};

exports.getAllPortfolios = async () => {
  return await Portfolio.find();
};

exports.getPortfolioById = async (id) => {
  return await Portfolio.findById(id);
};
