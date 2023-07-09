const router = require("express").Router();
const {
  createFeature,
  getAllFeature,
} = require("../controllers/feature");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.post("/",verifyTokenAndAdmin, createFeature);

router.get("/", getAllFeature);


module.exports = router;
