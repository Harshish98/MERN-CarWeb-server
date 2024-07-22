const CarModel = require("../model/carModel");

const AddCar = async (req, res) => {
  try {
    const images =
      req.files && req.files.images
        ? req.files.images.map((file) => file.filename)
        : [];
    const video =
      req.files && req.files.video ? req.files.video[0].filename : null;

    const carData = {
      ...req.body,
      images: images,
      video: video,
      features: req.body.features ? JSON.parse(req.body.features) : [],
    };
    const car = new CarModel(carData);
    await car.save();
    res.status(200).json(car);
  } catch (error) {
    console.log(error);
  }
};

const GetCar = async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
  }
};

const GetCarByAscend = async (req, res) => {
  try {
    const cars = await CarModel.find().sort("carName");
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
  }
};

const EditCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await CarModel.findById(id);

    if (!car) {
      return res.status(404).json({ message: "No such car found" });
    }

    const updatedData = { ...req.body };

    if (req.files && req.files.images) {
      updatedData.images = req.files.images.map((file) => file.filename);
    }
    if (req.files && req.files.video) {
      updatedData.video = req.files.video[0].filename;
    }

    if (req.body.features) {
      updatedData.features = JSON.parse(req.body.features);
    }

    const updatedCar = await CarModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    console.log(updatedCar);
    res
      .status(200)
      .json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    console.error("Error updating the car", error);
    res
      .status(500)
      .json({ message: "Failed to update car", error: error.message });
  }
};


const GetCarById = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "No such car found" });
    }
    res.status(200).json({ message: "Car found", car: car });
  } catch (error) {
    console.log("Error in getting the specific car", error);
  }
};

const GetModelsByBrand = async (req, res) => {
  try {
    const brands = req.query.brands;

    if (!brands) {
      return res.status(400).json({ error: "Brands parameter is required" });
    }

    const brandArray = brands.split(",");

    const models = await CarModel.distinct("model", {
      brand: { $in: brandArray },
    });
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const DeleteCar = async (req, res) => {
  try {
    const carId = req.params.id
    console.log(carId)
    const deletedCar = await CarModel.findByIdAndDelete(carId);
    res.status(200).json({ message: "Car deleted successfully" });
    console.log(deletedCar)
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("error in deleting the car: ", error);
  }
};

module.exports = {
  AddCar,
  GetCar,
  GetCarById,
  GetModelsByBrand,
  EditCar,
  GetCarByAscend,
  DeleteCar,
};
