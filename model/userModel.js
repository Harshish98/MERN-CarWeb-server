const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
