const { default: mongoose } = require("mongoose");

const CarSchema = new mongoose.Schema({
  images: {
    type: [String],
  },
  video: {
    type: String,
  },
  carName: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  condition: {
    type: String,
    enum: ["Good", "Average"],
  },
  year: {
    type: Number,
  },
  bodyType: {
    type: String,
    enum: ["Sedan", "SUV", "Hatchback", "Truck"],
  },
  seats: {
    type: String,
  },
  exteriorColor: {
    type: String,
  },
  fuelType: {
    type: String,
    enum: ["Diesel", "Petrol", "Electric", "Hybrid"],
  },
  mileage: {
    type: String,
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"],
  },
  driveTrain: {
    type: String,
    enum: ["Rear-wheel", "Front-wheel", "All-wheel"],
  },
  power: {
    type: String,
  },
  length: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  cargoVolume: {
    type: Number,
  },
  batteryCapacity: {
    type: Number,
  },
  chargingTime: {
    type: Number,
  },
  chargeSpeed: {
    type: Number,
  },
  chargePort: {
    type: String,
  },
  tankCapacity: {
    type: Number,
  },
  features: {
    type: [String],
  },
});

const CarModel = mongoose.model("Cars", CarSchema);

module.exports = CarModel;
