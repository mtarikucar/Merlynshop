const { models } = require("../database/");

// Create a new Product
async function createProduct(req, res, next) {
  const { photos, thumbnail, name, description, price, quantity, categoryId } =
    req.body;
  try {
    await models.product
      .create({
        name: name,
        thumbnail: thumbnail,
        description: description,
        price: price,
        quantity: quantity,
        categoryId: categoryId,
      })
      .then((newProduct) => {
        photos.forEach(async (element) => {
          await models.photo.create({
            imgpath: element.imgpath,
            productId: newProduct.id,
          });
        });
        res.status(201).json(newProduct);
      });
  } catch (err) {
    next(err);
  }
}

// Get a list of all Products
async function getAllProducts(req, res, next) {
  try {
    const Products = await models.product.findAll();
    res.status(200).json(Products);
  } catch (err) {
    next(err);
  }
}

// Get a specific Product by ID
async function getProductById(req, res, next) {
  const ProductId = req.params.id;
  try {
    const foundProduct = await models.product.findByPk(ProductId);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (err) {
    next(err);
  }
}

// Update a Product by ID
async function updateProductById(req, res, next) {
  const ProductId = req.params.id;
  try {
    const [numUpdated, updatedProduct] = await models.product.update(req.body, {
      where: { id: ProductId },
      returning: true,
    });
    if (numUpdated === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct[0]);
  } catch (err) {
    next(err);
  }
}

// Delete a Product by ID
async function deleteProductById(req, res, next) {
  const ProductId = req.params.id;
  try {
    await models.product
      .destroy({
        where: { id: ProductId },
      })
      .then((numDeleted) => {
        if (numDeleted === 0) {
          return res.status(404).json({ message: "Product not found" });
        }
        models.photo
          .destroy({
            where: { productId: ProductId },
          })
          .then(() => {
            console.log("buraya geldim");
            return res
              .status(200)
              .json({ message: "Product deleted successfully" });
          });
      });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
