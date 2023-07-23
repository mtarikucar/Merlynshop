function applyRelationships(sequelize) {
  const { photo, order, user, product, feature, category, location, comment,product_feature,coupon,coupon_user } =
    sequelize.models;

  //order
  order.belongsToMany(product, { through: "order_product" });
  product.belongsToMany(order, { through: "order_product" });

  user.hasMany(order);
  order.belongsTo(user);
  order.hasOne(location);
  

  
  product.belongsTo(category);
  category.hasMany(product);
  
  photo.belongsTo(product);
  product.hasMany(photo);
  
  comment.belongsTo(product);
  product.hasMany(comment)
  comment.belongsTo(user)
  user.hasMany(comment)  

  product_feature.belongsTo(product);
  product.hasMany(product_feature)
  product_feature.belongsTo(feature)
  feature.hasMany(product_feature)  

  coupon_user.belongsTo(coupon);
  coupon.hasMany(coupon_user)
  coupon_user.belongsTo(user)
  user.hasMany(coupon_user) 


}

module.exports = { applyRelationships };
