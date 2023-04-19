const { Router } = require('express');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const { createOrder, updateOrder, getOrderById, getAllOrders } = require('../controllers/order');
const router = Router()


// Create a new order
// Create a new order
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id",getOrderById)

module.exports = router;