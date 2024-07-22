const CarModel = require("../model/carModel");

const search = async (req, res) => {
  try {
    const {
      keyword,
      brand,
      model,
      minPrice,
      maxPrice,
      location,
      year,
      bodyType,
      transmission,
      fuelType,
      driveTrain,
      seats,
      exteriorColor,
    } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { carName: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { model: { $regex: keyword, $options: "i" } },
      ];
    }

    if (brand) {
      if (!Array.isArray(brand)) {
        brand = [brand];
      }
      query.brand = { $in: brand.map((b) => new RegExp(b, "i")) };
    }

    if (model) {
      if (!Array.isArray(model)) {
        model = [model];
      }
      query.model = { $in: model.map((m) => new RegExp(m, "i")) };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (year) {
      if (!Array.isArray(year)) {
        year = [year];
      }
      query.year = year;
    }

    if (bodyType) {
      query.bodyType = { $regex: bodyType, $options: "i" };
    }

    if (transmission) {
      query.transmission = { $regex: transmission, $options: "i" };
    }

    if (fuelType) {
      query.fuelType = { $regex: fuelType, $options: "i" };
    }

    if (driveTrain) {
      query.driveTrain = { $regex: driveTrain, $options: "i" };
    }

    if (seats) {
      query.seats = seats;
    }

    if (exteriorColor) {
      query.exteriorColor = { $regex: exteriorColor, $options: "i" };
    }

    const results = await CarModel.find(query);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = search;
