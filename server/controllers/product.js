const { models } = require("../database/");
const { Op } = require('sequelize');
// Create a new Product
async function createProduct(req, res, next) {
  const { photos, thumbnail, name, description, price, quantity, size, categoryId, discountedPrice } =
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
        size: size,
        discountedPrice: discountedPrice
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

async function getAllProducts(req, res, next) {
  const { categoryId, size, minPrice, maxPrice } = req.query;

  let where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (size) {
    where.size = size;
  }
  if (minPrice && maxPrice) {
    where.price = {
      [Op.between]: [minPrice, maxPrice]
    };
  } else if (minPrice) {
    where.price = {
      [Op.gte]: minPrice
    };
  } else if (maxPrice) {
    where.price = {
      [Op.lte]: maxPrice
    };
  }

  try {
    const products = await models.product.findAll({
      where,
      include: [{ model: models.category }, { model: models.photo }],
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

// Get a specific Product by ID
async function getProductById(req, res, next) {
  const ProductId = req.params.id;
  try {
    const foundProduct = await models.product.findByPk(ProductId, {

      include: [{ model: models.category }, { model: models.photo },{ model: models.comment, include: [models.user] }],
    });
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (err) {
    next(err);
  }
}

async function updateProductById(req, res, next) {
  console.log(req.body);
  const productId = req.params.id;
  const { photos, thumbnail, name, description, price, quantity, size, categoryId, discountedPrice } =req.body;
  try {
    const updatedProduct = await models.product.findOne({
      where: { id: productId },
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await updatedProduct.update({
      name: name || updatedProduct.name,
      thumbnail: thumbnail || updatedProduct.thumbnail,
      description: description || updatedProduct.description,
      price: price || updatedProduct.price,
      quantity: quantity || updatedProduct.quantity,
      categoryId: categoryId || updatedProduct.categoryId,
      size: size || updatedProduct.size,
      discountedPrice: discountedPrice || updatedProduct.discountedPrice
    });

    // Update product photos
    if (photos && photos.length > 0) {
      const newPhotos = await Promise.all(
        photos.map(async (photo) => {
          return await models.photo.create({
            imgpath: photo.imgpath,
            productId: productId,
          });
        })
      );

      // Remove old photos
      const oldPhotos = await updatedProduct.getPhotos();
      await Promise.all(
        oldPhotos.map(async (photo) => {
          if (!newPhotos.find((p) => p.id === photo.id)) {
            await photo.destroy();
          }
        })
      );
    }

    const updatedProductWithPhotos = await models.product.findOne({
      where: { id: productId },
      include: { model: models.photo, as: "photos" },
    });

    res.status(200).json(updatedProductWithPhotos);
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