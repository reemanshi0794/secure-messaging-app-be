const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database schema updated");
  })
  .catch((error) => {
    console.error("Error syncing database schema:", error);
  });
module.exports = sequelize;
