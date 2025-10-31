import mongoose from 'mongoose';

const Phase3Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  price: { type: Number, required: true },
  available: { type: Boolean, required: true, default: false },
  remaining: { type: Number, required: true, default: 0 },
  image: { type: String, required: false },
  
});

export default mongoose.model('Phase3', Phase3Schema);