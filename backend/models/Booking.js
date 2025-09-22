import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // Personal details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  workPhone: { type: String },
  homePhone: { type: String },
  streetAddress: { type: String, required: true },
  streetAddress2: { type: String },
  city: { type: String, required: true },
  state: {
    type: String,
    enum: ["ACT", "NSW", "VIC", "QLD", "NT", "WA", "TAS", "SA"],
    required: true,
  },
  postCode: { type: String, required: true },

  // Motorcycle details
  motorcycleMake: { type: String, required: true },
  motorcycleModel: { type: String, required: true },
  motorcycleYear: { type: String },
  registrationState: {
    type: String,
    enum: ["ACT", "NSW", "VIC", "QLD", "NT", "WA", "TAS", "SA"],
    required: true,
  },
  regoPlate: { type: String },
  vinNumber: { type: String },
  regoExpiry: { type: Date },
  currentKms: { type: Number },
  lastServiceDate: { type: Date },

  // Faults / problems
  ongoingFaults: { type: String, enum: ["yes", "no"], default: "no" },
  faultsDescription: { type: String },

  // Work summary
  summaryOfWork: { type: String },

  // Service options
  newTyres: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  tyreDetails: {
    Width: { type: String },
    Height: { type: String },
    rimSize: { type: String },
    backWidth: { type: String },
    backHeight: { type: String },
    backrimSize: { type: String },
  },
  newTube: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  spokeCheck: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  preFiltersInstalled: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  uhfBluetooth: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  extraGearFitted: { type: String, enum: ["yes", "no", "maybe"], default: "no" },
  suspensionMods: { type: String, enum: ["yes", "no", "maybe"], default: "no" },

  // Booking dates
  preferredDateTime: { type: Date, required: true },
  collectionNeeded: {
    type: String,
    enum: [
      "critical - Next few days",
      "urgent - Next 7 days",
      "soon - Next fortnight",
      "no hurry - Next 30 days",
    ],
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
