const { default: mongoose } = require("mongoose");

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error in connecting to database:", error);
  }
};

module.exports = DBConnection;
