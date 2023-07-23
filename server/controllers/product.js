const { models } = require("../database/");
const { Op } = require("sequelize");

// Create a new Product
async function createProduct(req, res, next) {
  const {
    photos,
    thumbnail,
    name,
    description,
    price,
    features,
    categoryId,
    discountedPrice,
  } = req.body;
  console.log(
    photos,
    thumbnail,
    name,
    description,
    price,
    features,
    categoryId,
    discountedPrice
  );
  try {
    await models.product
      .create({
        name: name,
        thumbnail: thumbnail,
        description: description,
        price: price,
        categoryId: categoryId,
        discountedPrice: discountedPrice,
      })
      .then((newProduct) => {
        features.forEach(async (element) => {
          await models.product_feature.create({
            featureId: element.featureId,
            productId: newProduct.id,
            value: element.value,
            quantity: element.quantity,
          });
        });

        photos.forEach(async (element) => {
          await models.photo.create({
            imgpath: element.imgpath,
            productId: newProduct.id,
          });
        });

        res.status(201).json(newProduct);
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllProducts(req, res, next) {
  const { categoryId, size, minPrice, maxPrice, page, limit, sort } = req.query;

  let where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (size) {
    where.size = size;
  }
  if (minPrice && maxPrice) {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  } else if (minPrice) {
    where.price = {
      [Op.gte]: minPrice,
    };
  } else if (maxPrice) {
    where.price = {
      [Op.lte]: maxPrice,
    };
  }

  const options = {
    where,
    include: [{ model: models.category }, { model: models.photo }],
    offset: page && limit ? (page - 1) * limit : 0,
    limit: !!limit ? limit : null,
    order: [["price", sort === "desc" ? "DESC" : "ASC"]],
  };

  try {
    const products = await models.product.findAll(options);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

// Get a specific Product by ID
async function getProductById(req, res, next) {
  const productId = req.params.id;
  try {
    const foundProduct = await models.product.findByPk(productId, {
      include: [
        { model: models.photo },
        {
          model: models.comment,
          include: [models.user],
        },
        {
          model: models.product_feature,
          include: [models.feature],
          group: ["featureId"], // features ID'lerine göre gruplama yapılıyor
          attributes: ["id", "featureId", "quantity", "value"], // sadece featureId'leri alınıyor
        },
      ],
    });
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
  }
}

// Ürünü güncelle
async function updateProductById(req, res, next) {
  const {
    photos,
    thumbnail,
    name,
    description,
    price,
    features,
    categoryId,
    discountedPrice,
  } = req.body;

  const { productId } = req.params;

  try {
    // Ürünü veritabanından bul
    const product = await models.product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı" });
    }

    // Ürün bilgilerini güncelle
    product.name = name;
    product.thumbnail = thumbnail;
    product.description = description;
    product.price = price;
    product.categoryId = categoryId;
    product.discountedPrice = discountedPrice;

    // Ürünü kaydet
    await product.save();

    // Özellikleri güncelle
    await models.product_feature.destroy({
      where: {
        productId: product.id,
      },
    });

    features.forEach(async (element) => {
      await models.product_feature.create({
        featureId: element.featureId,
        productId: product.id,
        value: element.value,
        quantity: element.quantity,
      });
    });

    // Fotoğrafları güncelle
    await models.photo.destroy({
      where: {
        productId: product.id,
      },
    });

    photos.forEach(async (element) => {
      await models.photo.create({
        imgpath: element.imgpath,
        productId: product.id,
      });
    });

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
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
