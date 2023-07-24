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
  
  const cookies = req.cookies;


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
      {
        expiresIn: "1d",
      }
    );

    if (cookies?.jwt) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    res.cookie("jwt", token, {
      httpOnly: true,
      /* secure: true, */
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    delete user.password
    delete user.refreshtoken

    return res.status(200).json({
      status: "success",
      message: "User is logined successfully",
      data: {
        token,
        user,
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

async function logout(req, res) {

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  try {

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    console.log(res.cookie);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { login, register, logout };