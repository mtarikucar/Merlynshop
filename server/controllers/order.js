const { models } = require("../database/");

async function createOrder(req, res, next) {
  const { status, total_price, products, userId } = req.body;
  try {
    // create an order in the 'order' table
    const newOrder = await models.order.create({
      status: status,
      total_price: total_price,
      userId:userId
    });

    // iterate over the 'products' array and create an entry in the 'orderProduct' table for each product
    products.forEach(async (element) => {
      await models.order_product.create({
        orderId: newOrder.id,
        productId: element.id,
        quantity: element.quantity,
      });
    });

    // return the newly created order
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
}


module.exports = {
  createOrder,
};
