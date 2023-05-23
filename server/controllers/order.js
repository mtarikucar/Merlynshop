const { models } = require("../database/");

async function createOrder(prop) {
  const { status, total_price, products, userId, location } = prop;
  console.log(prop, "body");
  try {
    // create an order in the 'order' table
    const newOrder = await models.order.create({
      status: status,
      total_price: total_price,
      userId: userId,
    });
    console.log(newOrder, "newOrder");
    // iterate over the 'products' array and create an entry in the 'orderProduct' table for each product
    products.forEach(async (element) => {
      await models.order_product
        .create({
          orderId: newOrder.id,
          productId: element.id,
          quantity: element.quantity,
        })

        .catch(() => {
          console.log("err");
        });
    });
    console.log("başarılıiiiiiiiiiiiiii");

    await models.location.create({
      orderId: newOrder.id,
      address: location,
    })
    console.log("lokasyon başarılı");

    // return the newly created order
  } catch (err) {

  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await models.order.findAll({
      include: [{ model: models.product }, { model: models.user }, { model: models.location }],
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}


async function updateOrder(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // find the order by its id
    const order = await models.order.findOne({ where: { id: id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // update the order status
    const updatedOrder = await order.update({ status });

    res.status(200).json({ updatedOrder });
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  const { id } = req.params;
  try {
    const order = await models.order.findByPk(id, {
      include: [{ model: models.product }, { model: models.user }, { model: models.location }],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}


async function getOrderByUserId(req, res, next) {
  const { id } = req.params;
  const userId =id
  console.log(userId,"user");
  try {
    const orders = await models.order.findAll({
      where: { userId },
      include: [{ model: models.product }, { model: models.user }, { model: models.location }],
    });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the user' });
    }
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}


async function deleteOrderById(req, res, next) {
  const { id } = req.params;

  try {
    // find the order by its id
    const order = await models.order.findOne({ where: { id: id } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // delete the order
    await models.order.destroy({ where: { id: id } });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrderByUserId,
  deleteOrderById
};