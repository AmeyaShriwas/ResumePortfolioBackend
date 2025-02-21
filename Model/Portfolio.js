const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectImage: { type: String }, // Store the image URL or file path
  techStack: { type: String, required: true },
  liveLink: { type: String },
  githubLink: { type: String },
});

const PortfolioSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  name: { type: String, required: true },
  profilePhoto: { type: String }, // Store the image URL or file path
  bio: { type: String },
  linkedin: { type: String },
  resume: { type: String }, // Store the resume file path or URL
  skills: { type: String, required: true },
  projects: [ProjectSchema], // Array of projects
  email: { type: String, required: true, unique: true },
  phone: { type: String },
}, { timestamps: true });

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
