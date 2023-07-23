// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon');

// Tüm kuponları listele
router.get('/', couponController.getAllCoupons);

// Yeni kupon oluştur
router.post('/', couponController.createCoupon);

// Kupon güncelle
router.put('/:id', couponController.updateCoupon);

// Kuponu sil
router.delete('/:id', couponController.deleteCoupon);

// Kullanıcıya kupon ekleme
router.post("/coupon-user", couponController.addCouponToUser);

// Kullanıcının kuponu kullanma
router.put("/coupon-user/use", couponController.useCoupon);

module.exports = router;