const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnection = require("./config/db");
const { car, user, message, filter } = require("./router");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.static("assets"));
app.use(car);
app.use(user);
app.use(message);
app.use(filter);

const port = process.env.port || 3090;

DBConnection().then(() => {
  app.listen(port, () => {
    console.log(`App is listening on port - ${port}`);
  });
});
