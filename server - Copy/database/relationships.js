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
  cart.belongsToMany(product, {through: "cartProduct"})
  product.belongsToMany(cart, {through: "cartProduct"})

  //order
  order.belongsToMany(product, { through: "orderProduct" });
  product.belongsToMany(order, { through: "orderProduct" });
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
