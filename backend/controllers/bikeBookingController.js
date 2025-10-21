import dotenv from "dotenv";
import BikeBooking from "../models/BikeBooking.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to send emails
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: info.response };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return { success: false, message: error.message };
  }
};

// Helper function to format date
const formatDate = (date) => {
  try {
    return date ? new Date(date).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" }) : "N/A";
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid Date";
  }
};

// Create a new bike booking
export const createBooking = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const {
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      totalDays,
      bikeModel,
      bikePrice,
      gearOption,
      subGearOption,
      gear,
      addOns,
      riderDetails,
      emergencyContact,
      licenceValid,
      licenceNumber,
      licenceExpiry,
      licenceState,
      agreementAccepted,
      paymentOption,
    } = req.body;

    // Validate required fields
    if (!pickupDate || !returnDate || !bikeModel || !agreementAccepted || !paymentOption) {
      return res.status(400).json({ message: "Missing required fields: pickupDate, returnDate, bikeModel, agreementAccepted, or paymentOption" });
    }
    if (!licenceNumber || !licenceNumber.trim()) {
      return res.status(400).json({ message: "Licence number is required" });
    }
    if (!licenceExpiry) {
      return res.status(400).json({ message: "Licence expiry date is required" });
    }
    if (!licenceState || !licenceState.trim()) {
      return res.status(400).json({ message: "Licence state is required" });
    }
    if (!licenceValid || !["Yes", "No"].includes(licenceValid)) {
      return res.status(400).json({ message: "Licence valid status must be 'Yes' or 'No'" });
    }
    if (licenceValid === "No") {
      return res.status(400).json({ message: "A valid driver's licence is required" });
    }

    const licenceFile = req.file ? req.file.path : null;
    if (!licenceFile) {
      console.warn("File not received by multer, expected licenceFile");
      return res.status(400).json({ message: "Licence file is required" });
    }
    console.log("Processed licence file:", { file: req.file, path: licenceFile });

    const userId = req.user?.id;
    console.log("createBooking: User from request", { userId });

    if (!userId) {
      console.error("Authentication error: No user ID found in request");
      return res.status(401).json({ message: "Authentication required" });
    }

    const riderDetailsObj = riderDetails ? JSON.parse(riderDetails) : {};
    if (!riderDetailsObj.email) {
      return res.status(400).json({ message: "User email is required in riderDetails" });
    }

    // Create new booking
    const bikeBooking = new BikeBooking({
      userId,
      pickupDate: new Date(pickupDate),
      returnDate: new Date(returnDate),
      pickupTime,
      returnTime,
      totalDays: Number(totalDays),
      bikeModel,
      bikePrice: Number(bikePrice),
      gearOption,
      gear: gear ? JSON.parse(gear) : {},
      addOns: addOns ? JSON.parse(addOns) : {},
      riderDetails: riderDetailsObj,
      emergencyContact: emergencyContact ? JSON.parse(emergencyContact) : {},
      licenceDetails: {
        licenceValid,
        licenceNumber,
        licenceExpiry: new Date(licenceExpiry),
        licenceState,
        licenceFile,
      },
      agreementAccepted: Boolean(agreementAccepted),
      paymentOption,
    });

    const savedBooking = await bikeBooking.save();
    console.log("Booking saved", { bookingId: savedBooking._id.toString() });

    // Verify Nodemailer configuration
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Nodemailer configuration error", { error: error.message });
          reject(error);
        } else {
          console.log("Nodemailer configuration verified successfully");
          resolve(success);
        }
      });
    });

    // Prepare email content
    const userEmailContent = `
      Dear ${riderDetailsObj.firstName || "Customer"},
      Thank you for booking a bike with MotoTrekkin! Your booking details are as follows:
      Booking ID: ${savedBooking._id}
      Bike Model: ${bikeModel}
      Pickup Date: ${formatDate(pickupDate)}
      Return Date: ${formatDate(returnDate)}
      Total Days: ${totalDays || "N/A"}
      Status: ${savedBooking.paymentStatus || "Pending"}
      We will contact you to confirm your booking. If you have any questions, please reach out at 02 4072 4511 or reply to this email.
      Best regards,
      The MotoTrekkin Team
    `;

    const adminEmailContent = `
      New Bike Booking Received
      Booking ID: ${savedBooking._id}
      User: ${riderDetailsObj.firstName || "Unknown"} ${riderDetailsObj.lastName || ""} (${riderDetailsObj.email})
      Bike Model: ${bikeModel}
      Pickup Date: ${formatDate(pickupDate)}
      Return Date: ${formatDate(returnDate)}
      Total Days: ${totalDays || "N/A"}
      Status: ${savedBooking.paymentStatus || "Pending"}
      Please review the booking and contact the user to confirm the rental.
    `;

    // Send emails
    let emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };
    if (riderDetailsObj.email) {
      const userEmailResult = await sendEmail(riderDetailsObj.email, "Bike Booking Confirmation", userEmailContent);
      emailStatus.userEmailSent = userEmailResult.success;
      if (!userEmailResult.success) emailStatus.errors.push({ user: userEmailResult.message });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminEmailResult = await sendEmail(adminEmail, "New Bike Booking Notification", adminEmailContent);
    emailStatus.adminEmailSent = adminEmailResult.success;
    if (!adminEmailResult.success) emailStatus.errors.push({ admin: adminEmailResult.message });

    // Calculate payment amounts
    const totalDaysNum = Number(totalDays) || 0;
    const bikeRentalUSD = Number(bikePrice) * totalDaysNum;
    const gearUSD =
      gearOption === "Bike hire + gear" && subGearOption === "Package Option - $100/day"
        ? 100.0 * totalDaysNum
        : gearOption === "Bike hire + gear" && subGearOption === "Individually"
        ? (gear ? (JSON.parse(gear).helmet * 45 + JSON.parse(gear).jacket * 65 + JSON.parse(gear).gloves * 25) : 0) * totalDaysNum
        : 0;
    const excessReductionUSD = addOns ? (JSON.parse(addOns).excessReduction ? 32.0 * totalDaysNum : 0) : 0;
    const tyreProtectionUSD = addOns ? (JSON.parse(addOns).tyreProtection ? 23.0 * totalDaysNum : 0) : 0;
    const windscreenUSD = addOns ? (JSON.parse(addOns).windscreen ? 10.0 * totalDaysNum : 0) : 0;

    const subtotalUSD = bikeRentalUSD + gearUSD + excessReductionUSD + tyreProtectionUSD + windscreenUSD;
    const merchantFeePercentage = 0.015; // 1.5%
    const fixedFeeUSD = 0.02; // $0.02
    const merchantFeeUSD = subtotalUSD * merchantFeePercentage + fixedFeeUSD;
    const totalAmountUSD = subtotalUSD + merchantFeeUSD;
    const totalAmountCents = Math.round(totalAmountUSD * 100);

    console.log("createBooking: Itemized amounts in USD", {
      bikeRentalUSD,
      gearUSD,
      excessReductionUSD,
      tyreProtectionUSD,
      windscreenUSD,
      subtotalUSD,
      merchantFeeUSD,
      totalAmountUSD,
    });
    console.log("createBooking: Total amount in cents", { totalAmountCents });

    let paymentResponse = { id: null };
    try {
      paymentResponse = await createPaymentSession(req, res, {
        amount: totalAmountCents,
        currency: "usd",
        description: `Bike Booking: ${bikeModel}`,
        bookingId: savedBooking._id,
      });
      console.log("createBooking: Payment session response", { paymentResponse });
    } catch (paymentError) {
      console.error("Payment session creation failed:", paymentError.message);
      // Continue with response even if payment session fails to allow booking to be saved
    }

    res.status(201).json({
      message: "Bike booking created successfully",
      bookingId: savedBooking._id.toString(),
      emailStatus,
      paymentSessionId: paymentResponse.id,
    });
  } catch (error) {
    console.error("Error in createBooking:", error.stack);
    if (!res.headersSent) {
      res.status(400).json({ message: `Failed to process booking: ${error.message}` });
    }
  }
};

// Create a Stripe payment session
export const createPaymentSession = async (req, res, { amount, currency, description, bookingId }) => {
  try {
    console.log("createPaymentSession: Creating session", { amount, currency, description, bookingId });
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount for payment session");
    }
    const origin = req.headers.origin || "http://localhost:5174";
    const bookingIdStr = bookingId.toString();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "usd",
            product_data: { name: description || "Bike Booking" },
            unit_amount: Math.round(amount),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingIdStr}`,
      cancel_url: `${origin}/cancel?bookingId=${bookingIdStr}`,
      metadata: { bookingId: bookingIdStr },
    });
    console.log("createPaymentSession: Session created", { sessionId: session.id });
    return { id: session.id };
  } catch (error) {
    console.error("createPaymentSession: Error", error.message, { stack: error.stack });
    throw error;
  }
};

// Verify a payment session
export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      await BikeBooking.findByIdAndUpdate(session.metadata.bookingId, { paymentStatus: "paid" });
      res.json({ status: "success", bookingId: session.metadata.bookingId });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("verifyPayment: Error", error.message);
    res.status(500).json({ message: "Failed to verify payment" });
  }
};

// Get bookings for a user
export const getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching bookings for userId:", userId);

    const bookings = await BikeBooking.find({ userId }).sort({ createdAt: -1 });
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }
    console.log("Bookings fetched:", { count: bookings.length });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Get bike bookings for a admin
export const getAllBookings = async (req, res) => {
  try {
    console.log("bikeBookingController: Fetching all bookings");
    const bookings = await BikeBooking.find().sort({ createdAt: -1 });
    if (!bookings.length) {
      return res.status(404).json({ message: "No bike bookings found" });
    }
    console.log("bikeBookingController: Bookings fetched", { count: bookings.length });
    res.json(bookings);
  } catch (error) {
    console.error("bikeBookingController: Failed to fetch bookings", error.message);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// delete bike bookings from a admin
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("bikeBookingController: Deleting booking", id);
    const booking = await BikeBooking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await BikeBooking.deleteOne({ _id: id });
    console.log("bikeBookingController: Booking deleted", id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("bikeBookingController: Failed to delete booking", error.message);
    res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};

export { stripe };