const { Router } = require('express');
const {verifyTokenAndAuthorization} = require('../middlewares/verifyToken');
const { updateProduct, deleteProduct, getProduct} = require('../controllers/product');
const router = Router()

// POST => /api/product/add
router.post('/add',verifyTokenAndAuthorization, addToCart);

// PUT => /api/product/:id
router.patch('/:id', verifyTokenAndAuthorization, updateCartProduct);

// DELETE => /api/product/:id
router.delete('/:id', verifyTokenAndAuthorization, deleteCartProduct);

// GET => /api/product/:id
router.get('/:id',verifyTokenAndAuthorization, getCart);

module.exports =router