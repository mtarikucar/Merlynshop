const { DataTypes } = require("sequelize");


function applyRelationships(sequelize) {
  const {
    photo,
    order,
    user,
    payment,
    product,
    category,
    cart
  } = sequelize.models;

  
  //cart
  user.hasOne(cart)
  cart.belongsTo(user)
  cart.belongsToMany(product, {through: "cart_roduct"})
  product.belongsToMany(cart, {through: "cart_roduct"})

  //order
  order.belongsToMany(product, { through: "order_product" });
  product.belongsToMany(order, { through: "order_product" });
  user.hasMany(order);
  order.belongsTo(user);
  payment.belongsTo(order);
  order.hasOne(payment);

  //product
  product.belongsTo(category);
  category.hasMany(product);
  photo.belongsTo(product)
  product.hasMany(photo)
}

module.exports = { applyRelationships };
