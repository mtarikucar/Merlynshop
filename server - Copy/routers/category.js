const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// Create a new company
router.post("/add",verifyTokenAndAdmin, createCategory);

// Get a list of all companies
router.get("/", verifyTokenAndAdmin, getAllCategories);

// Get a specific company by ID
router.get("/:id", verifyTokenAndAdmin, getCategoryById);

// Update a company by ID
router.put("/:id", verifyTokenAndAdmin, updateCategoryById);

// Delete a company by ID
router.delete("/:id", verifyTokenAndAdmin, deleteCategoryById);

module.exports = router;
