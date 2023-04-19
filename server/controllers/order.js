const { models } = require("../database/");

async function createOrder(req, res, next) {
  const { status, total_price, products, userId, location } = req.body;
  try {
    // create an order in the 'order' table
    const newOrder = await models.order.create({
      status: status,
      total_price: total_price,
      userId: userId,
    });

    // iterate over the 'products' array and create an entry in the 'orderProduct' table for each product
    products.forEach(async (element) => {
      await models.order_product
        .create({
          orderId: newOrder.id,
          productId: element.id,
          quantity: element.quantity,
        })
        .catch(() => {
          res.status(400).json({ message: "error at order creates" });
        });
    });

    await models.location.create({
      orderId: newOrder.id,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude
    })

    res.status(201).json({ newOrder });
    // return the newly created order
  } catch (err) {
    next(err);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await models.order.findAll({
      include: [{ model: models.product },{model: models.user}],
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  const { id } = req.params;
  try {
    const order = await models.order.findByPk(id, {
      include: [{ model: models.product },{model: models.user}],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById
};