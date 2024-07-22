const express = require("express");
const {
  GetCarByAscend,
  DeleteCar,
  GetCarById,
  GetCar,
  GetModelsByBrand,
  EditCar,
  AddCar,
} = require("../controller/carController");
const {
  AddUser,
  UserLogin,
  GetAllUser,
  GetUserDetails,
  ForgotPassword,
  ResetPassword,
} = require("../controller/userController");
const { SendMessage, GetMessages } = require("../controller/contactController");
const search = require("../controller/searchController");
const { upload } = require("../middleware/multer");

const car = express.Router();

car.post(
  "/add-car",
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "video", maxCount: 1 },
  ]),
  AddCar
);
car.get("/sort-cars", GetCarByAscend);
car.delete("/delete-car/:id", DeleteCar);
car.get("/car/:id", GetCarById);
car.get("/get-cars", GetCar);
car.get("/models", GetModelsByBrand);
car.put("/edit-car/:id", EditCar);

const user = express.Router();

user.post("/signup", AddUser);
user.post("/login", UserLogin);
user.get("/all-users", GetAllUser);
user.get("/user-details", GetUserDetails);
user.post("/forgot-password", ForgotPassword);
user.post("/reset-password/:id/:token", ResetPassword);

const message = express.Router();

message.post("/send-message", SendMessage);
message.get("/get-messages", GetMessages);

const filter = express.Router();

filter.get("/search", search);

module.exports = { car, user, message, filter };
