const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const { models } = require("../database");

async function register(req, res) {
  
  try {
    const oldUser = await models.user.findOne({
      where: {
        email: req.body.email,
        isDeleted: false,
      },
    });

    if (oldUser) {
      return res.status(400).send("User Has Already Exist. Please Login");
    }
    console.log();

    bcrypt
      .hash(req.body.password, 12)
      .then(async (hashedPassword) => {
        console.log(hashedPassword);
        return (user = models.user.create({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: hashedPassword
        }));
      })
      .then((user) => {
        res.status(201).json({
          status: "success",
          message: "User is registered successfully.",
          user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "error at register part of sending",
          message: JSON.stringify(error),
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error at register to database",
      message: JSON.stringify(err),
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await models.user.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "notFound",
        message: "User not found!",
      });
    }

    const userJSON = user.toJSON();

    if (!bcrypt.compareSync(password, userJSON.password)) {
      return res.status(400).json({
        status: "badRequest",
        message: "Wrong Password!",
      });
    }

    // Create token
    const token = JWT.sign(
      {
        id: user.id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      //!todo ▼ I dont remember what's doing in here 
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      status: "success",
      message: "User is logined successfully",
      data: {
        token,
        user: user,
      },
    });
  } catch (err) {
    // Error
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: JSON.stringify(err),
    });
  }
}

module.exports = { login, register };