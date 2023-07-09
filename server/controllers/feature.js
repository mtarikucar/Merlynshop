const { models } = require("../database");

async function createFeature(req, res, next) {
  try {
    const newFeature = await models.feature.create(req.body);
    res.status(201).json(newFeature);
  } catch (err) {
    next(err);
  }
}

async function getAllFeature(req, res, next) {
  try {
    const Feature = await models.feature.findAll();
    res.status(200).json(Feature);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createFeature,
  getAllFeature,
};
