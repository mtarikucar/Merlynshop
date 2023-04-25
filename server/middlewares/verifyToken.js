const JWT = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(400).json({ message: 'Not authenticated!' });
  }
  const token = authorization.split(' ')[1];
  
  let payload;
  try {
    /* Returns the payload if the signature is valid.
    If not, it will throw the error. */
    payload = JWT.verify(token, process.env.JWT_SECRET);
    
  } catch (error) {
    return res.status(500).json({
      msg: "token decoder error",
      error
    });
  }
  
  req.user = payload;
  next();
};

module.exports.verifyTokenAndAdmin = (req, res, next) => {
  module.exports.verifyToken(req, res, () => {
    console.log("req.user",req.user);
    if (req.user.role === "admin"){
      return next();
    } else {
      return res.status(403).json({ message: 'You are not allowed to do that!' });
    }
  });
};