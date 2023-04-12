const { Router } = require('express');
const {verifyTokenAndAuthorization} = require('../middlewares/verifyToken');
const { updateUser, deleteUser, getUser, deleteUserPermanent } = require('../controllers/user');
const { register } = require('../controllers/auth');
const router = Router()


// PATCH => /api/user/:id
router.patch('/:id', verifyTokenAndAuthorization, updateUser);

// DELETE => /api/user/:id
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

// DELETE => /api/user/admin/:id
router.delete('/admin/:id', verifyTokenAndAuthorization, deleteUserPermanent);

// POST => /api/user/admin/add
router.post('/admin/add',verifyTokenAndAuthorization, register);

// GET => /api/user/:id
router.get('/:id',verifyTokenAndAuthorization, getUser);

module.exports =router