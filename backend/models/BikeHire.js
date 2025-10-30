import mongoose from 'mongoose';

const bikeHireSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  price: { type: Number, required: true },
  available: { type: Boolean, required: true, default: false },
  remaining: { type: Number, required: true, default: 0 },
  image: { type: String, required: false }, // Store image path or URL
  engineType: { type: String, default: 'Not Available' },
  fuelCapacity: { type: String, default: 'Not Available' },
  weight: { type: String, default: 'Not Available' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('BikeHire', bikeHireSchema);