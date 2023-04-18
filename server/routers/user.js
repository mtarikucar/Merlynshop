const { Router } = require('express');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const { updateUser, deleteUser, getUser, deleteUserPermanent ,getAllUser} = require('../controllers/user');
const { register } = require('../controllers/auth');
const router = Router()


// PUT => /api/user/:id
router.put('/:id', verifyTokenAndAdmin, updateUser);

// DELETE => /api/user/:id
router.delete('/:id', deleteUser);

// DELETE => /api/user/admin/:id
router.delete('/admin/:id', verifyTokenAndAdmin, deleteUserPermanent);

// POST => /api/user/admin/add
router.post('/admin/add',verifyTokenAndAdmin, register);

// GET => /api/user/:id
router.get('/:id', getUser);
// GET all user => /api/user
router.get('/', getAllUser);

module.exports =router