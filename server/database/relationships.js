

function applyRelationships(sequelize) {
  const { photo, order, user, payment, product, category, location } =
    sequelize.models;

  //order
  order.belongsToMany(product, { through: "order_product" });
  product.belongsToMany(order, { through: "order_product" });
  user.hasMany(order);
  order.belongsTo(user);
  payment.belongsTo(order);
  order.hasOne(payment);
  order.hasOne(location);

  //product
  product.belongsTo(category);
  category.hasMany(product);
  photo.belongsTo(product);
  product.hasMany(photo);
}

module.exports = { applyRelationships };
