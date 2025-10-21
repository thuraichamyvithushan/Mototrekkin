import mongoose from "mongoose";

const bikeBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add userId
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  totalDays: { type: Number, required: true },
  bikeModel: { type: String, required: true },
  gearOption: { type: String, required: true },
  gear: {
    helmet: Boolean,
    jacket: Boolean,
    gloves: Boolean,
  },
  addOns: {
    excessReduction: Boolean,
    tyreProtection: Boolean,
    windscreen: Boolean,
  },
  riderDetails: {
    firstName: String,
    lastName: String,
    gender: String,
    email: { type: String, required: true },
    confirmEmail: String,
    birthday: Date,
    occupation: String,
    mobile: String,
    landline: String,
    streetAddress: String,
    streetAddress2: String,
    city: String,
    postCode: String,
    country: String,
    state: String,
  },
  emergencyContact: {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    landline: String,
    emergencyRelation: String,
  },
  licenceDetails: {
    licenceValid: { type: String, required: true },
    licenceNumber: { type: String, required: true },
    licenceExpiry: { type: Date, required: true },
    licenceState: String,
    licenceFile: { type: String }, // Store file path or URL after upload
  },
  agreementAccepted: { type: Boolean, required: true },
  paymentOption: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BikeBooking", bikeBookingSchema);