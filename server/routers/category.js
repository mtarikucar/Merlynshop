const router = require("express").Router();
const categoryController = require("../controllers/category");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
// Create a new company
router.post("/",verifyTokenAndAdmin, categoryController.createCategory);

// Get a list of all companies
router.get("/",verifyTokenAndAdmin, categoryController.getAllCategories);

// Get a specific company by ID
router.get("/:id",verifyTokenAndAdmin, categoryController.getCategoryById);

// Update a company by ID
router.put("/:id",verifyTokenAndAdmin, categoryController.updateCategoryById);

// Delete a company by ID
router.delete("/:id",verifyTokenAndAdmin, categoryController.deleteCategoryById);

module.exports = router;