const router = require("express").Router();
const {createProduct,getAllProducts,getProductById,updateProductById,deleteProductById} = require("../controllers/product");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
// Create a new company
router.post("/",verifyTokenAndAdmin, createProduct);

// Get a list of all companies
router.get("/", getAllProducts);

// Get a specific company by ID
router.get("/:id", getProductById);

// Update a company by ID
router.put("/:id",verifyTokenAndAdmin, updateProductById);

// Delete a company by ID
router.delete("/:id",verifyTokenAndAdmin, deleteProductById);

module.exports = router;