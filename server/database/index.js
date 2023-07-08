const { Sequelize } = require("sequelize");
const { applyRelationships } = require("./relationships");

// Connection
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_URL
    : {
      username: process.env.SERVERDB_USERNAME,
      password:process.env.SERVERDB_PASSWORD ,
       
      database: process.env.SERVERDB_DATABASE,
      port:process.env.SERVERDB_PORT ,
      host: process.env.SERVERDB_HOST,
      ssl: false,
      dialect:process.env.SERVERDB_DIAILECT,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
    }
);


const modelDefiners = [
  require("./models/category.model"),
  require("./models/location.model"),
  require("./models/order.model"),
  require("./models/order_product.model"),
  require("./models/payment.model"),
  require("./models/product.model"),
  require("./models/user.model"),
  require("./models/photo.model"),
  require("./models/comment.model")
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyRelationships(sequelize);



// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;