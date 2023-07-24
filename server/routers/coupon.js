// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon');

const { verifyTokenAndAdmin,verifyToken } = require("../middlewares/verifyToken");


// Tüm kuponları listele
router.get('/',verifyToken, couponController.getAllCoupons);

// Yeni kupon oluştur
router.post('/',verifyTokenAndAdmin, couponController.createCoupon);

// Kupon güncelle
router.put('/:id',verifyTokenAndAdmin, couponController.updateCoupon);

// Kuponu sil
router.delete('/:id',verifyTokenAndAdmin, couponController.deleteCoupon);

// Kullanıcıya kupon ekleme
router.post("/coupon-user",verifyTokenAndAdmin, couponController.addCouponToUser);

// Kullanıcının kuponu kullanma
router.put("/coupon-user/use",verifyToken, couponController.useCoupon);

module.exports = router;