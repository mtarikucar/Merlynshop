const { Router } = require('express');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { createOrder, getOrderById, getAllOrders, updateOrder,getOrderByUserId } = require('../controllers/order');
const router = Router()


// Create a new order
router.post("/", createOrder);

// Get all orders (only accessible by admin)
router.get("/", getAllOrders);

// Get order by ID
router.get("/:id", getOrderById);

// Get orders by user ID
router.get("/user/:id", getOrderByUserId);

// Update order (only accessible by admin)
router.patch("/:id", updateOrder);


module.exports = router;