const { default: mongoose } = require("mongoose");

const ContactSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      enum: ["Test Drive", "More Info"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
