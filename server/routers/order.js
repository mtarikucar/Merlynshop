const { Router } = require('express');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const { createOrder, updateOrder, getOrderById, getAllOrder } = require('../controllers/order');
const router = Router()


// Create a new order
router.post("/", createOrder);


module.exports = router;