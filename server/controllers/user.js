const { models } = require("../database");

async function updateUser(req, res) {
  try {
    const updatedUser = await models.user.findByPk(req.params.id);
    updatedUser.update({
      name: req.body.name,
      gender: req.body.gender,
    });
    // updatedUser is the document after update because of new: true
    res.status(200).json({
      message: "User is updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteUser(req, res) {
  try {
    const gonnaDeletedUser = await models.user.findByPk(req.params.id);
    await gonnaDeletedUser.save({
      isActive: false,
      isDeleted: true,
    });
    res.status(200).json({
      message: "User is deleted successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteUserPermanent(req, res) {
  try {
    const gonnaDeletedUser = await models.user.findByPk(req.params.id);
    await gonnaDeletedUser.destroy();
    res.status(200).json({
      message: "User is deleted successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getUser(req, res) {
  try {
    const user = await models.user.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAllUser(req, res) {
  try {
    const user = await models.user.findAll();
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  deleteUserPermanent,
  getAllUser,
};
