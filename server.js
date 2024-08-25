const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const sequelize = require("./config/db");
const setupWebSocketServer = require("./socketServer");


const app = express();
app.use(cors());
app.use(bodyParser.json());
require("./models/index");

app.use("/auth", authRoutes); 
app.use("/chat", chatRoutes);

const server = app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  await sequelize.sync(); 
});
setupWebSocketServer(server);
