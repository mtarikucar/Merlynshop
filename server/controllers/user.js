const { models } = require("../database");

async function updateUser(req, res) {
  try {
    const user = await models.user.findOne({
      where: {
        id: req.params.id,
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(404).send("User not found. Please check the provided ID.");
    }

    console.log(req.body);
    const updatedData = {
      name: req.body.name || user.name,
      email: (req.body.email && req.body.email.toLowerCase()) || user.email,
      phone:  req.body.phone_number  || user.phone_number
    };

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await user.update(updatedData);

    res.status(200).json({
      status: "success",
      message: "User is updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error at updateUser to database",
      message: JSON.stringify(err),
    });
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
    const users = await models.user.findAll();
    res.status(200).json(
      users
    );
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  deleteUserPermanent,
  getAllUser
};
