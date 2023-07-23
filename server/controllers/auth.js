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
          password: hashedPassword,
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
    const accessToken = JWT.sign(
      {
        id: user.id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const newRefreshToken = JWT.sign(
      { id: user.id.toString() },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15s" }
    );


    if (cookies?.jwt) {
      /* 
    Scenario added here: 
        1) User logs in but never uses RT and does not logout 
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when the user logs in
    */


      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // Saving refreshToken with the current user
    await user.update({
      refreshToken: newRefreshToken,
    });

    // Creates Secure Cookie with the refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to the user
    res.json({ user:user,accessToken:accessToken });
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
  
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  
  const refreshToken = cookies.jwt;

  try {
    // Veritabanında refreshToken'i bul
    const user = await User.findOne({ where: { refreshToken:refreshToken } });
    console.log(user);
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    }

    // refreshToken'i veritabanından kaldır
    await user.update({
      refreshToken: null,
    });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    console.log(res.cookie);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = { login, register, logout };
