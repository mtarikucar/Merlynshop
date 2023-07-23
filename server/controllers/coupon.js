// controllers/couponUserController.js
const { models } = require("../database"); // Bu satırda modellerinizi projenize uygun bir şekilde doğru yola yönlendirmeniz gerekebilir.

// Kullanıcıya kupon ekleme
async function addCouponToUser(req, res) {
  try {
    const { userId, couponId, expirationDate, quantity } = req.body;

    // Kuponu bul
    const Coupon = await models.coupon.findByPk(couponId);
    if (!Coupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    // Kullanıcıya kuponu ekle
    const couponUser = await models.coupon_user.create({
      expirationDate,
      quantity,
      isUsed: false,
      userId,
      couponId,
    });

    res.status(201).json(couponUser);
  } catch (error) {
    console.error("Error adding coupon to user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kullanıcının kuponu kullanma
async function useCoupon(req, res) {
  try {
    const { userId, couponId } = req.body;

    // Kullanıcının kuponunu bul
    const couponUser = await models.coupon_user.findOne({
      where: { userId, couponId, isUsed: false },
    });

    if (!couponUser) {
      return res
        .status(404)
        .json({ message: "Coupon not found or already used." });
    }

    // Kuponu kullanma durumunu güncelle
    await couponUser.update({ isUsed: true });

    res.json({ message: "Coupon successfully used." });
  } catch (error) {
    console.error("Error using coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Tüm kuponları listele
async function getAllCoupons(req, res) {
  try {
    const coupons = await models.coupon.findAll();
    res.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Yeni kupon oluştur
async function createCoupon(req, res) {
  try {
    const { code, minOrderAmount, discountAmount } = req.body;
    const newCoupon = await models.coupon.create({
      code,
      minOrderAmount,
      discountAmount,
    });
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kupon güncelle
async function updateCoupon(req, res) {
  try {
    const { id } = req.params;
    const { code, minOrderAmount, discountAmount } = req.body;

    // Bu işlem, önce kuponu bulur ve ardından verileri günceller.
    const updatedCoupon = await models.coupon.update(
      { code, minOrderAmount, discountAmount },
      { where: { id }, returning: true }
    );

    res.json(updatedCoupon[1][0]); // Güncellenmiş kupon verisini döndürür
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Kuponu sil
async function deleteCoupon(req, res) {
  try {
    const { id } = req.params;

    // Bu işlem, kuponu siler ve etkilenen satır sayısını döndürür (0 veya 1)
    const deletedCount = await models.coupon.destroy({ where: { id } });

    if (deletedCount > 0) {
      res.json({ message: "Coupon deleted successfully." });
    } else {
      res.status(404).json({ message: "Coupon not found." });
    }
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  addCouponToUser,
  useCoupon,
};