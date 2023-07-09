const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
} = require("../controllers/category");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.post("/",verifyTokenAndAdmin, createCategory);

router.get("/", getAllCategories);


module.exports = router;
