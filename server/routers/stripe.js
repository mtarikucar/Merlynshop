const express = require("express");

const router = express.Router();
const { createOrder } = require("../controllers/order")
router.post("/create-checkout-session", async (req, res) => {
  var cartItemsInfo = req.body.cartItems.map(function (item) {
    return {
      id: item.id,
      quantity: item.cartQuantity
    };
  });

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(cartItemsInfo),
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
      allowed_countries: ["US", "CA", "KE"],
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
    success_url: `https://nurlightllc.com/checkout-success`,
    cancel_url: `https://nurlightllc.com/`,

  });

  res.send({ url: session.url });
});



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    let data;

    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;
    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      console.log(`Webhook Verified `);
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } catch (err) {
      console.log(`Webhook Error: ${(err).message}`);
      res.status(400).send(`Webhook Error: ${(err).message}`);
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
      return;
    }
    // Check if webhook signing is configured.



    /* console.log("eventtype:\n", eventType, "data:",data, ); */


    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {

      console.log("ödeme başarılı mı?");

      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
         
            const Items = JSON.parse(customer.metadata.cart);

            const products = Items.map((item) => {
              return {
                id: item.id,
                quantity: item.quantity,
              };
            });
            const addressString = `${data.customer_details.address.city}, ${data.customer_details.address.country}, ${data.customer_details.address.line1}, ${data.customer_details.address.line2}, ${data.customer_details.address.postal_code}, ${data.customer_details.address.state}`;

            // CREATE ORDER
            createOrder(

              prop = {
                status: "pending",
                total_price: data.amount_total,
                products: products,
                userId: customer.metadata.userId,
                location: addressString,
              })

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
