import BikeHire from "../models/BikeHire.js";

// Create a new bike hire
export const createBikeHire = async (req, res) => {
  try {
    const { name, price, available, remaining, engineType, fuelCapacity, weight } = req.body;

    const newBikeHire = new BikeHire({
      name,
      price,
      available,
      remaining,
      engineType: engineType || "Not Available",
      fuelCapacity: fuelCapacity || "Not Available",
      weight: weight || "Not Available",
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newBikeHire.save();
    res.status(201).json({ message: "Bike hire added successfully", bikeHire: newBikeHire });
  } catch (error) {
    res.status(500).json({ message: "Error adding bike hire", error: error.message });
  }
};

// Get all bike hires
export const getAllBikeHires = async (req, res) => {
  try {
    const bikeHires = await BikeHire.find();
    res.status(200).json(bikeHires);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bike hires", error: error.message });
  }
};

// Get single bike hire
export const getBikeHireById = async (req, res) => {
  try {
    const bikeHire = await BikeHire.findById(req.params.id);
    if (!bikeHire) return res.status(404).json({ message: "Bike hire not found" });
    res.status(200).json(bikeHire);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bike hire", error: error.message });
  }
};

// Update bike hire
export const updateBikeHire = async (req, res) => {
  try {
    const { name, price, available, remaining, engineType, fuelCapacity, weight } = req.body;
    const bikeHire = await BikeHire.findById(req.params.id);
    if (!bikeHire) return res.status(404).json({ message: "Bike hire not found" });

    bikeHire.name = name || bikeHire.name;
    bikeHire.price = price || bikeHire.price;
    bikeHire.available = available !== undefined ? available : bikeHire.available;
    bikeHire.remaining = remaining || bikeHire.remaining;
    bikeHire.engineType = engineType || bikeHire.engineType;
    bikeHire.fuelCapacity = fuelCapacity || bikeHire.fuelCapacity;
    bikeHire.weight = weight || bikeHire.weight;
    if (req.file) bikeHire.image = `/uploads/${req.file.filename}`;

    await bikeHire.save();
    res.status(200).json({ message: "Bike hire updated successfully", bikeHire });
  } catch (error) {
    res.status(500).json({ message: "Error updating bike hire", error: error.message });
  }
};

// Delete bike hire
export const deleteBikeHire = async (req, res) => {
  try {
    const bikeHire = await BikeHire.findById(req.params.id);
    if (!bikeHire) return res.status(404).json({ message: "Bike hire not found" });

    await BikeHire.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Bike hire deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bike hire", error: error.message });
  }
};
