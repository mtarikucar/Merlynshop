const express = require("express");

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  var cartItemIds = req.body.cartItems.map(function (item) {
    return item.id;
  });
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(cartItemIds),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.thumbnail],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "TR"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `http://127.0.0.1:5173/checkout-success`,
    cancel_url: `http://127.0.0.1:5173/`,
  });

  res.send({ url: session.url });
});

// Create order function

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.cartQuantity,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook






// This is your Stripe CLI webhook secret for testing your endpoint locally.




const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    let data;
    let eventType;

    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;
    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      console.log(`Webhook Verified: `, event);
    } catch (err) {
      console.log(`Webhook Error: ${(err ).message}`);
      res.status(400).send(`Webhook Error: ${(err ).message}`);
      return;
    }
    // Check if webhook signing is configured.
    console.log(endpointSecret, "endpointSecret");
   
   

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            console.log(customer);
            // CREATE ORDER
            /* createOrder(customer, data); */
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);




module.exports = router;
