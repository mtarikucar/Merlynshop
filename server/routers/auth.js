const { login, register,logout } = require('../controllers/auth');

const router = require('express').Router();

const {checkPasswordStrength} = require("../utils/auth")


// POST => /api/auth/register
router.post('/register',checkPasswordStrength, register);

// POST => /api/auth/login
router.post('/login',login);


// POST => /api/auth/logout
router.post('/logout',logout);

module.exports = router;
