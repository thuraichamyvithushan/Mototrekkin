import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Mlogo from "../../assets/services/mlogo.webp";
import agreementpdf from "../../assets/MT-CUSTOM-MOLDED-EAR-PROTECTION.pdf"

// ---------- Main Form ----------
const BikeBookingForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Dates
    pickupDate: null,
    returnDate: null,
    pickupTime: "",
    returnTime: "",
    totalDays: 0,

    // Step 2: Bike & Gear
    bikeModel: "",
    gearOption: "Bike hire only",
    gear: { helmet: false, jacket: false, gloves: false },
    addOns: { excessReduction: false, tyreProtection: false, windscreen: false },
    subGearOption: "",
    bikePrice: 0,
    bikeSpecs: {},
    bikeImg: "",

    // Step 3: Rider Details
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    confirmEmail: "",
    birthday: "",
    occupation: "",
    mobile: "",
    landline: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    postCode: "",
    country: "",
    state: "",

    // Step 4: Emergency Contact & Driver's Licence
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyEmail: "",
    emergencyMobile: "",
    emergencyLandline: "",
    emergencyRelation: "",
    licenceValid: "",
    licenceNumber: "",
    licenceExpiry: null,
    licenceState: "",
    licenceFile: null,

    // Step 5: Agreement
    agreementAccepted: false,

    // Step 6: Summary
    paymentOption: "Full Payment",
  });

  const countryStateMap = {
    Australia: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Tasmania",
      "Western Australia",
      "South Australia",
      "Northern Territory",
      "Australian Capital Territory",
    ],
    NewZealand: [
      "Auckland",
      "Wellington",
      "Canterbury",
      "Otago",
      "Waikato",
      "Bay of Plenty",
      "Manawatu-Wanganui",
      "Hawke's Bay",
    ],
  };

  // ---------- Handle Inputs ----------
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith("gear.")) {
      const gearKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        gear: { ...prev.gear, [gearKey]: checked },
      }));
    } else if (name.startsWith("addOns.")) {
      const addOnKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addOns: { ...prev.addOns, [addOnKey]: checked },
      }));
    } else if (name === "agreementAccepted") {
      setFormData((prev) => ({ ...prev, agreementAccepted: checked }));
    } else if (name === "licenceFile") {
      setFormData((prev) => ({ ...prev, licenceFile: files[0] }));
    } else if (name === "paymentOption") {
      setFormData((prev) => ({ ...prev, paymentOption: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  // ---------- Date Change ----------
  const handleDateChange = (key, date) => {
    const updated = { ...formData, [key]: date };

    if (key === "pickupDate" || key === "returnDate") {
      if (updated.pickupDate && updated.returnDate) {
        const days =
          (updated.returnDate - updated.pickupDate) / (1000 * 60 * 60 * 24) + 1;
        updated.totalDays = days > 0 ? Math.floor(days) : 0;
      }
    }

    setFormData(updated);
  };

  // ---------- Navigation ----------
  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  // ---------- Validation ----------
  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.pickupDate &&
          formData.returnDate &&
          formData.pickupTime &&
          formData.returnTime
        );
      case 2:
        return formData.bikeModel && formData.gearOption;
      case 3:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.gender &&
          formData.email &&
          formData.confirmEmail &&
          formData.email === formData.confirmEmail &&
          formData.birthday &&
          formData.occupation &&
          formData.mobile &&
          formData.streetAddress &&
          formData.city &&
          formData.postCode &&
          formData.country &&
          formData.state
        );
      case 4:
        return (
          formData.emergencyFirstName &&
          formData.emergencyLastName &&
          formData.emergencyEmail &&
          formData.emergencyMobile &&
          formData.emergencyRelation &&
          formData.licenceValid &&
          formData.licenceNumber &&
          formData.licenceExpiry &&
          formData.licenceState &&
          formData.licenceFile
        );
      case 5:
        return formData.agreementAccepted;
      case 6:
        return formData.paymentOption;
      default:
        return true;
    }
  };

  // ---------- Calculate Total Cost ----------
  const calculateTotal = () => {
    let total = formData.bikePrice * formData.totalDays;
    if (formData.gearOption === "Bike hire + gear") {
      if (formData.subGearOption === "Package Option - $100/day") {
        total += 100 * formData.totalDays;
      } else if (formData.subGearOption === "Individually") {
        if (formData.gear.helmet) total += 45 * formData.totalDays;
        if (formData.gear.jacket) total += 65 * formData.totalDays;
        if (formData.gear.gloves) total += 25 * formData.totalDays;
      }
    }
    if (formData.addOns.excessReduction) total += 32 * formData.totalDays;
    if (formData.addOns.tyreProtection) total += 23 * formData.totalDays;
    if (formData.addOns.windscreen) total += 10 * formData.totalDays;
    return total;
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "licenceFile" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (key === "pickupDate" || key === "returnDate" || key === "licenceExpiry") {
          formDataToSend.append(key, formData[key] ? format(formData[key], "yyyy-MM-dd") : "");
        } else if (typeof formData[key] === "object") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      await axios.post("http://localhost:5000/api/bike-bookings", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Booking submitted successfully!");
      setStep(1);
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to submit booking. Please try again.";
      alert(message);
    }
  };

  // ---------- Button Style ----------
  const getButtonClass = (enabled) =>
    `px-6 py-2 rounded ${
      enabled ? "bg-[#edab1a] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20 font-sans">
      <div className="mb-8">
        <img src={Mlogo} alt="Bike Hire" className="mx-auto w-48 h-auto rounded-lg" />
      </div>

      <form className="w-full space-y-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">BOOK A BIKE</h2>

        {/* Step Progress Bar */}
        <div className="flex justify-between mb-8" role="progressbar" aria-valuenow={step} aria-valuemin="1" aria-valuemax="7">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 mx-1 ${step >= s ? "bg-[#edab1a]" : "bg-gray-300"}`}
              aria-label={`Step ${s} ${step >= s ? "completed" : "incomplete"}`}
            />
          ))}
        </div>

        {/* Step 1: Hire Dates */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Choose Hire Date</h3>
            <hr className="w-6xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium">Pickup Date</label>
                <DatePicker
                  selected={formData.pickupDate}
                  onChange={(date) => handleDateChange("pickupDate", date)}
                  selectsStart
                  startDate={formData.pickupDate}
                  endDate={formData.returnDate}
                  minDate={new Date()}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="font-medium">Return Date</label>
                <DatePicker
                  selected={formData.returnDate}
                  onChange={(date) => handleDateChange("returnDate", date)}
                  selectsEnd
                  startDate={formData.pickupDate}
                  endDate={formData.returnDate}
                  minDate={formData.pickupDate || new Date()}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            {/* Times + Days */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium">Pickup Time</label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Pickup Time</option>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Return Time</label>
                <select
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Return Time</option>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Total Days</label>
                <input
                  type="text"
                  value={formData.totalDays}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Bike & Gear */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Choose Bike & Gear</h3>
            <hr className="w-6xl" />
            {/* Bike Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "CRF250 RALLY",
                  price: 205,
                  available: true,
                  remaining: 1,
                  img: "/images/crf250.jpg",
                  specs: { engine: "250cc Liquid-cooled", weight: "155 kg", fuel: "10.1 L" },
                },
                {
                  id: 2,
                  name: "KAWASAKI VERSYS",
                  price: 220,
                  available: false,
                  remaining: 0,
                  img: "/images/versys.jpg",
                  specs: { engine: "649cc Parallel Twin", weight: "216 kg", fuel: "21 L" },
                },
                {
                  id: 3,
                  name: "HONDA CB500X",
                  price: 230,
                  available: true,
                  remaining: 1,
                  img: "/images/cb500x.jpg",
                  specs: { engine: "471cc Parallel Twin", weight: "197 kg", fuel: "17.7 L" },
                },
              ].map((bike) => (
                <div
                  key={bike.id}
                  className={`border rounded-lg p-4 cursor-pointer text-center ${
                    formData.bikeModel === bike.name ? "border-yellow-500" : "border-gray-300"
                  } ${!bike.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    bike.available &&
                    setFormData((prev) => ({
                      ...prev,
                      bikeModel: bike.name,
                      bikePrice: bike.price,
                      bikeSpecs: bike.specs,
                      bikeImg: bike.img,
                    }))
                  }
                >
                  <img
                    src={bike.img}
                    alt={bike.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold">{bike.name}</h4>
                  <p className="text-sm text-gray-600">
                    {bike.available ? `(${bike.remaining} remaining)` : "SOLD OUT"}
                  </p>
                  <p className="font-bold">${bike.price}/day</p>
                </div>
              ))}
            </div>

            {/* Bike Preview with Specs */}
            {formData.bikeModel && (
              <div className="mt-6 p-4 border rounded bg-gray-50 flex gap-4 items-start">
                <img
                  src={formData.bikeImg}
                  alt={formData.bikeModel}
                  className="w-40 h-28 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">Selected Bike</h3>
                  <p>
                    {formData.bikeModel} - ${formData.bikePrice}/day
                  </p>
                  <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
                    <li>Engine: {formData.bikeSpecs?.engine}</li>
                    <li>Weight: {formData.bikeSpecs?.weight}</li>
                    <li>Fuel: {formData.bikeSpecs?.fuel}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Gear Options */}
            <h4 className="text-lg font-medium mt-6">Choose to Hire Gear</h4>
            <div className="space-y-2 flex flex-col">
              <label>
                <input
                  type="radio"
                  name="gearOption"
                  value="Bike hire only"
                  checked={formData.gearOption === "Bike hire only"}
                  onChange={handleChange}
                />{" "}
                Bike hire only
              </label>
              <label>
                <input
                  type="radio"
                  name="gearOption"
                  value="Bike hire + gear"
                  checked={formData.gearOption === "Bike hire + gear"}
                  onChange={handleChange}
                />{" "}
                Bike hire + gear
              </label>
            </div>

            {/* Sub Gear Options */}
            {formData.gearOption === "Bike hire + gear" && (
              <div className="ml-6 mt-4 space-y-2 flex flex-col">
                <label>
                  <input
                    type="radio"
                    name="subGearOption"
                    value="Package Option - $100/day"
                    checked={formData.subGearOption === "Package Option - $100/day"}
                    onChange={handleChange}
                  />{" "}
                  Package Option - $100/day
                </label>
                <label>
                  <input
                    type="radio"
                    name="subGearOption"
                    value="Individually"
                    checked={formData.subGearOption === "Individually"}
                    onChange={handleChange}
                  />{" "}
                  Individually
                </label>

                {formData.subGearOption === "Individually" && (
                  <div className="ml-6 space-y-2 flex flex-col">
                    <label>
                      <input
                        type="checkbox"
                        name="gear.helmet"
                        checked={formData.gear.helmet}
                        onChange={handleChange}
                      />{" "}
                      Helmet - $45/day
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="gear.jacket"
                        checked={formData.gear.jacket}
                        onChange={handleChange}
                      />{" "}
                      Jacket - $65/day
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="gear.gloves"
                        checked={formData.gear.gloves}
                        onChange={handleChange}
                      />{" "}
                      Gloves - $25/day
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Add-On Options */}
            <h4 className="text-lg font-medium mt-6">Add-On Options</h4>
            <div className="space-y-2 flex flex-col">
              <label>
                <input
                  type="checkbox"
                  name="addOns.excessReduction"
                  checked={formData.addOns.excessReduction}
                  onChange={handleChange}
                />{" "}
                Excess Reduction - $32/day
              </label>
              <label>
                <input
                  type="checkbox"
                  name="addOns.tyreProtection"
                  checked={formData.addOns.tyreProtection}
                  onChange={handleChange}
                />{" "}
                Tyre Protection - $23/day
              </label>
              <label>
                <input
                  type="checkbox"
                  name="addOns.windscreen"
                  checked={formData.addOns.windscreen}
                  onChange={handleChange}
                />{" "}
                Touring Windscreen (Tall) - $10/day
              </label>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Rider Details */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Rider Details</h3>
            <hr className="w-6xl" />
            <p className="text-sm text-gray-600">Enter your personal information and license details.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                  Confirm Email
                </label>
                <input
                  id="confirmEmail"
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail || ""}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                />
                {formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail && (
                  <p className="text-red-500 text-sm">Emails do not match.</p>
                )}
              </div>

              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={formData.birthday || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  id="occupation"
                  type="text"
                  name="occupation"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                  placeholder="Software Developer"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  placeholder="+94 77 123 4567"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="landline" className="block text-sm font-medium text-gray-700">
                  Landline
                </label>
                <input
                  id="landline"
                  type="text"
                  name="landline"
                  value={formData.landline || ""}
                  onChange={handleChange}
                  placeholder="+94 11 234 5678"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress || ""}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="streetAddress2" className="block text-sm font-medium text-gray-700">
                  Street Address Line 2
                </label>
                <input
                  id="streetAddress2"
                  type="text"
                  name="streetAddress2"
                  value={formData.streetAddress2 || ""}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  placeholder="Colombo"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                  Post Code
                </label>
                <input
                  id="postCode"
                  type="text"
                  name="postCode"
                  value={formData.postCode || ""}
                  onChange={handleChange}
                  placeholder="00100"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prev) => ({ ...prev, state: "" }));
                  }}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                >
                  <option value="">Select Country</option>
                  {Object.keys(countryStateMap).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  required
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {formData.country &&
                    countryStateMap[formData.country].map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Emergency Contact & Driver's Licence Details */}
        {step === 4 && (
          <div className="space-y-8">
            {/* Emergency Contact Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Emergency Contact</h3>
              <hr className="w-6xl" />
              <p className="text-sm text-gray-600">Provide details of a person to contact in case of an emergency.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="emergencyFirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="emergencyFirstName"
                    type="text"
                    name="emergencyFirstName"
                    value={formData.emergencyFirstName || ""}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyLastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="emergencyLastName"
                    type="text"
                    name="emergencyLastName"
                    value={formData.emergencyLastName || ""}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="emergencyEmail"
                    type="email"
                    name="emergencyEmail"
                    value={formData.emergencyEmail || ""}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyMobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="emergencyMobile"
                    type="text"
                    name="emergencyMobile"
                    value={formData.emergencyMobile || ""}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyLandline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Landline
                  </label>
                  <input
                    id="emergencyLandline"
                    type="text"
                    name="emergencyLandline"
                    value={formData.emergencyLandline || ""}
                    onChange={handleChange}
                    placeholder="+94 11 234 5678"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyRelation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Relationship
                  </label>
                  <input
                    id="emergencyRelation"
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation || ""}
                    onChange={handleChange}
                    placeholder="Friend, Family, etc."
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Driver's Licence Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Driver's Licence Details</h3>
              <hr className="w-6xl" />
              <p className="text-sm text-gray-600">Provide your driver's licence information.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Is your licence currently valid?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="licenceValid"
                        value="Yes"
                        checked={formData.licenceValid === "Yes"}
                        onChange={handleChange}
                        className="accent-[#edab1a]"
                        required
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="licenceValid"
                        value="No"
                        checked={formData.licenceValid === "No"}
                        onChange={handleChange}
                        className="accent-[#edab1a]"
                        required
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  {formData.licenceValid === "No" && (
                    <p className="text-red-500 text-sm mt-1">
                      A valid driver's licence is required to proceed with the booking.
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="licenceNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Licence Number
                    </label>
                    <input
                      id="licenceNumber"
                      type="text"
                      name="licenceNumber"
                      value={formData.licenceNumber || ""}
                      onChange={handleChange}
                      placeholder="12345678"
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="licenceExpiry"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Licence Expiry Date
                    </label>
                    <DatePicker
                      id="licenceExpiry"
                      selected={formData.licenceExpiry}
                      onChange={(date) => handleDateChange("licenceExpiry", date)}
                      minDate={new Date()}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="licenceState"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State of Issue
                    </label>
                    <select
                      id="licenceState"
                      name="licenceState"
                      value={formData.licenceState || ""}
                      onChange={handleChange}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                      required
                      disabled={!formData.country}
                    >
                      <option value="">Select State</option>
                      {formData.country &&
                        countryStateMap[formData.country].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="licenceFile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload ID
                    </label>
                    <input
                      id="licenceFile"
                      type="file"
                      name="licenceFile"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-[#edab1a] focus:border-[#edab1a]"
                      required
                    />
                    {formData.licenceFile && (
                      <p className="text-sm text-gray-600 mt-1">
                        Selected file: {formData.licenceFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid() || formData.licenceValid === "No"}
                onClick={handleNext}
                className={getButtonClass(isStepValid() && formData.licenceValid !== "No")}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Agreement */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Rental Agreement</h3>
            <hr className="w-6xl" />
            <p className="text-sm text-gray-600">
              Please review the rental agreement below and accept the terms & conditions to proceed.
            </p>

            {/* Embedded Rental Agreement PDF */}
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Rental Agreement Document</h4>
              <iframe
                src={agreementpdf}
                title="Rental Agreement"
                className="w-full h-[600px] border rounded-lg"
                style={{ minHeight: "600px" }}
              ></iframe>
              <p className="text-sm text-gray-600 mt-2">
                <a
                  href="/assets/rental-agreement.pdf"
                  download
                  className="text-[#edab1a] hover:underline"
                >
                  Download Rental Agreement
                </a>
              </p>
            </div>

            {/* Agreement Acceptance */}
            <div className="mt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreementAccepted"
                  checked={formData.agreementAccepted}
                  onChange={handleChange}
                  className="accent-[#edab1a]"
                  required
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>

            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === 6 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Booking Summary</h3>
            <hr className="w-6xl" />
            <p className="text-sm text-gray-600">
              Review your booking details below. This summary was generated on{" "}
              {format(new Date(), "MMMM dd, yyyy 'at' hh:mm a z")} (04:28 PM +0530 on Wednesday,
              September 24, 2025).
            </p>

            {/* Purchase Summary Section */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-medium mb-2">Purchase Summary</h4>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {formData.bikeModel && (
                  <li>
                    <strong>{formData.bikeModel}</strong> (selected bike name)
                    <br />
                    <span className="ml-6">
                      Price: ${(formData.bikePrice * formData.totalDays).toFixed(2)}
                    </span>{" "}
                    (total price of bike for {formData.totalDays} days)
                  </li>
                )}
                {formData.gearOption === "Bike hire + gear" &&
                  formData.subGearOption === "Package Option - $100/day" && (
                    <li>
                      <strong>Package Option</strong> (selected package total price for{" "}
                      {formData.totalDays} days)
                      <br />
                      <span className="ml-6">
                        Price: ${(100 * formData.totalDays).toFixed(2)}
                      </span>
                    </li>
                  )}
                {formData.gearOption === "Bike hire + gear" &&
                  formData.subGearOption === "Individually" && (
                    <>
                      {formData.gear.helmet && (
                        <li>
                          <strong>Helmet</strong> (selected gear total price for {formData.totalDays}{" "}
                          days)
                          <br />
                          <span className="ml-6">
                            Price: ${(45 * formData.totalDays).toFixed(2)}
                          </span>
                        </li>
                      )}
                      {formData.gear.jacket && (
                        <li>
                          <strong>Jacket</strong> (selected gear total price for {formData.totalDays}{" "}
                          days)
                          <br />
                          <span className="ml-6">
                            Price: ${(65 * formData.totalDays).toFixed(2)}
                          </span>
                        </li>
                      )}
                      {formData.gear.gloves && (
                        <li>
                          <strong>Gloves</strong> (selected gear total price for {formData.totalDays}{" "}
                          days)
                          <br />
                          <span className="ml-6">
                            Price: ${(25 * formData.totalDays).toFixed(2)}
                          </span>
                        </li>
                      )}
                    </>
                  )}
                {formData.addOns.excessReduction && (
                  <li>
                    <strong>Excess Reduction</strong> (selected Add-On Options total price for{" "}
                    {formData.totalDays} days)
                    <br />
                    <span className="ml-6">
                      Price: ${(32 * formData.totalDays).toFixed(2)}
                    </span>
                  </li>
                )}
                {formData.addOns.tyreProtection && (
                  <li>
                    <strong>Tyre Protection</strong> (selected Add-On Options total price for{" "}
                    {formData.totalDays} days)
                    <br />
                    <span className="ml-6">
                      Price: ${(23 * formData.totalDays).toFixed(2)}
                    </span>
                  </li>
                )}
                {formData.addOns.windscreen && (
                  <li>
                    <strong>Touring Windscreen</strong> (selected Add-On Options total price for{" "}
                    {formData.totalDays} days)
                    <br />
                    <span className="ml-6">
                      Price: ${(10 * formData.totalDays).toFixed(2)}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Payment & Confirmation Section */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-medium mb-2">Payment & Confirmation</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Option (Required)
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="Full Payment"
                        checked={formData.paymentOption === "Full Payment"}
                        onChange={handleChange}
                        className="accent-[#edab1a]"
                        required
                      />
                      <span className="ml-2">Full Payment</span>
                    </label>
                  </div>
                </div>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Subtotal</strong>
                    <br />
                    <span className="ml-6">
                      ${(calculateTotal()).toFixed(2)}
                    </span>{" "}
                    (total of above items)
                  </li>
                  <li>
                    <strong>Merchant Fee</strong>
                    <br />
                    <span className="ml-6">Price: ${((calculateTotal() * 0.015) + 0.02).toFixed(2)}</span> (1.5% + $0.02 default)
                  </li>
                  <li>
                    <strong>TOTAL</strong>
                    <br />
                    <span className="ml-6">
                      ${(calculateTotal() + (calculateTotal() * 0.015) + 0.02).toFixed(2)}
                    </span>{" "}
                    (all total - final price)
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  Upon clicking "Next," you'll be directed to the Stripe Checkout form for a secure
                  payment experience.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={getButtonClass(isStepValid())}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Payment */}
        {step === 7 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payment</h3>
            <hr className="w-6xl" />
            <p className="text-gray-600">Stripe/PayPal integration goes here.</p>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-300 px-6 py-2 rounded">
                Previous
              </button>
              <button type="submit" className="bg-[#edab1a] text-white px-6 py-2 rounded">
                Submit Booking
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BikeBookingForm;