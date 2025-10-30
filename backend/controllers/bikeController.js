import Bike from "../models/Bike.js";

// Create a new bike
export const createBike = async (req, res) => {
  try {
    const { name, price, available, remaining, specs } = req.body;

    const newBike = new Bike({
      name,
      price,
      available,
      remaining,
      specs: specs ? JSON.parse(specs) : {},
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newBike.save();
    res.status(201).json({ message: "Bike added successfully", bike: newBike });
  } catch (error) {
    res.status(500).json({ message: "Error adding bike", error: error.message });
  }
};

// Get all bikes
export const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bikes", error: error.message });
  }
};

// Get single bike
export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bike", error: error.message });
  }
};

// Update bike
export const updateBike = async (req, res) => {
  try {
    const { name, price, available, remaining, specs } = req.body;
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });

    bike.name = name || bike.name;
    bike.price = price || bike.price;
    bike.available = available !== undefined ? available : bike.available;
    bike.remaining = remaining || bike.remaining;
    bike.specs = specs ? JSON.parse(specs) : bike.specs;
    if (req.file) bike.image = `/uploads/${req.file.filename}`;

    await bike.save();
    res.status(200).json({ message: "Bike updated successfully", bike });
  } catch (error) {
    res.status(500).json({ message: "Error updating bike", error: error.message });
  }
};

// Delete bike
export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });

    await Bike.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bike", error: error.message });
  }
};