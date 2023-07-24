const { Router } = require('express');
const { verifyTokenAndAdmin,verifyToken } = require('../middlewares/verifyToken');
const { createOrder, getOrderById, getAllOrders, updateOrder,getOrderByUserId,deleteOrderById } = require('../controllers/order');
const router = Router()


// Create a new order
router.post("/",verifyToken, createOrder);

// Get all orders (only accessible by admin)
router.get("/",verifyTokenAndAdmin, getAllOrders);

// Get order by ID
router.get("/:id",verifyToken, getOrderById);

router.delete("/:id",verifyToken, deleteOrderById);

// Get orders by user ID
router.get("/user/:id",verifyToken, getOrderByUserId);

// Update order (only accessible by admin)
router.patch("/:id",verifyToken, updateOrder);  // sipariş iptal etme talebi oluşturulabilmeli onaylanırsa iptal edilsin


module.exports = router;