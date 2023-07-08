function applyRelationships(sequelize) {
  const { photo, order, user, product, feature, category, location, comment } =
    sequelize.models;

  //order
  order.belongsToMany(product, { through: "order_product" });
  product.belongsToMany(order, { through: "order_product" });
  user.hasMany(order);
  order.belongsTo(user);
  order.hasOne(location);

  //product
  product.belongsTo(category);
  category.hasMany(product);

  photo.belongsTo(product);
  product.hasMany(photo);

  comment.belongsTo(product);

  product.hasMany(comment)
  comment.belongsTo(user)
  user.hasMany(comment)


/*   feature.belongsToMany(product, { through: "product_feature" });
  product.belongsToMany(feature, { through: "product_feature" }); */
}

module.exports = { applyRelationships };
