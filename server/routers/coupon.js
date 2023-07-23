// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon');

// Tüm kuponları listele
router.get('/coupons', couponController.getAllCoupons);

// Yeni kupon oluştur
router.post('/coupons', couponController.createCoupon);

// Kupon güncelle
router.put('/coupons/:id', couponController.updateCoupon);

// Kuponu sil
router.delete('/coupons/:id', couponController.deleteCoupon);

// Kullanıcıya kupon ekleme
router.post("/coupon-user", couponController.addCouponToUser);

// Kullanıcının kuponu kullanma
router.put("/coupon-user/use", couponController.useCoupon);

module.exports = router;