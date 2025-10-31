import Phase3 from "../models/Phase3Bike.js";

// Create a new bike 
export const createBike = async (req, res) => {
  try {
    const { name, price, available, remaining } = req.body;

    const newBikeHire = new Phase3({
      name,
      price,
      available,
      remaining,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newBikeHire.save();
    res.status(201).json({
      message: "Bike hire added successfully",
      bikeHire: newBikeHire,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding bike hire",
      error: error.message,
    });
  }
};

// Get all bike 
export const getAllBike = async (req, res) => {
  try {
    const bikeHires = await Phase3.find();
    res.status(200).json(bikeHires);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bike hires",
      error: error.message,
    });
  }
};

// Get single bike
export const getBikeById = async (req, res) => {
  try {
    const bikeHire = await Phase3.findById(req.params.id);
    if (!bikeHire)
      return res.status(404).json({ message: "Bike hire not found" });

    res.status(200).json(bikeHire);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bike hire",
      error: error.message,
    });
  }
};

// Update bike 
export const updateBike = async (req, res) => {
  try {
    const { name, price, available, remaining } = req.body;

    const bikeHire = await Phase3.findById(req.params.id);
    if (!bikeHire)
      return res.status(404).json({ message: "Bike hire not found" });

    bikeHire.name = name ?? bikeHire.name;
    bikeHire.price = price ?? bikeHire.price;
    bikeHire.available = available ?? bikeHire.available;
    bikeHire.remaining = remaining ?? bikeHire.remaining;

    if (req.file) {
      bikeHire.image = `/uploads/${req.file.filename}`;
    }

    await bikeHire.save();

    res.status(200).json({
      message: "Bike hire updated successfully",
      bikeHire,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating bike hire",
      error: error.message,
    });
  }
};

// Delete bike
export const deleteBike = async (req, res) => {
  try {
    const bikeHire = await Phase3.findById(req.params.id);
    if (!bikeHire)
      return res.status(404).json({ message: "Bike hire not found" });

    await Phase3.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Bike hire deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting bike hire",
      error: error.message,
    });
  }
};
