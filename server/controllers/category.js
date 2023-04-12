const {models} = require("../database/");

// Create a new Category
async function createCategory(req, res, next) {
  try {
    const newCategory = await models.category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
}


// Get a list of all Categories
async function getAllCategories(req, res, next) {
  try {
    const Categories = await models.category.findAll();
    res.status(200).json(Categories);
  } catch (err) {
    next(err);
  }
}


// Get a specific Category by ID
async function getCategoryById(req, res, next) {
  const CategoryId = req.params.id;
  try {
    const foundCategory = await models.category.findByPk(CategoryId);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(foundCategory);
  } catch (err) {
    next(err);
  }
}


// Update a Category by ID
async function updateCategoryById(req, res, next) {
  const CategoryId = req.params.id;
  try {
    const [numUpdated, updatedCategory] = await models.category.update(req.body, {
      where: { id: CategoryId },
      returning: true,
    });
    if (numUpdated === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory[0]);
  } catch (err) {
    next(err);
  }
}


// Delete a Category by ID
async function deleteCategoryById(req, res, next) {
  const CategoryId = req.params.id;
  try {
    const numDeleted = await models.category.destroy({ where: { id: CategoryId } });
    if (numDeleted === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};