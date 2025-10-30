import { Stripe } from 'stripe';
import NZSIRegistration from '../models/NZSIRegistration.js';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
const verifyTransporter = async () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error('createNZSIRegistration: Nodemailer verification failed', { error: error.message });
        reject(new Error(`Email server configuration error: ${error.message}`));
      } else {
        console.log('createNZSIRegistration: Nodemailer configuration verified');
        resolve(success);
      }
    });
  });
};

export const createNZSIRegistration = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('createNZSIRegistration: Creating registration', {
      userId,
      body: req.body,
      file: req.file ? {
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      } : 'No file',
    });

    const {
      personalDetails,
      emergencyContacts,
      medicalInfo,
      experience,
      motorcycle,
      licenceDetails,
      equipment,
      accommodation,
      group,
      terms,
      payment,
    } = req.body;

    // Parse JSON strings
    const parsedData = {};
    for (const key in req.body) {
      if (typeof req.body[key] === 'string' && key !== 'licenceFile') {
        try {
          parsedData[key] = JSON.parse(req.body[key]);
        } catch {
          parsedData[key] = req.body[key];
        }
      } else {
        parsedData[key] = req.body[key];
      }
    }

    // Validate required fields
    if (!parsedData.personalDetails?.email) {
      throw new Error('User email is required in personalDetails');
    }
    if (!parsedData.payment?.totalPayment) {
      throw new Error('Total payment is required');
    }

    let licenceFilePath = null;
    if (req.file) {
      console.log('createNZSIRegistration: Processing file upload', {
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
      const uploadDir = path.join(__dirname, '../Uploads');
      const fileName = req.file.filename;
      licenceFilePath = path.join(uploadDir, fileName);
      // Verify file exists
      await fs.access(licenceFilePath).catch(() => {
        throw new Error('License file not found on server');
      });
    } else {
      console.log('createNZSIRegistration: No licence file provided');
    }

    const totalPayment = parseFloat(parsedData.payment?.totalPayment || 0);
    if (!totalPayment || isNaN(totalPayment)) {
      throw new Error('Invalid total payment amount');
    }

    const registrationData = {
      userId,
      personalDetails: parsedData.personalDetails,
      emergencyContacts: parsedData.emergencyContacts,
      medicalInfo: parsedData.medicalInfo,
      experience: parsedData.experience,
      motorcycle: parsedData.motorcycle,
      licenceDetails: {
        ...parsedData.licenceDetails,
        licenceExpiryDate: parsedData.licenceDetails?.licenceExpiryDate
          ? new Date(parsedData.licenceDetails.licenceExpiryDate)
          : null,
        licenceFilePath,
      },
      equipment: parsedData.equipment,
      accommodation: parsedData.accommodation,
      group: parsedData.group,
      terms: parsedData.terms,
      payment: {
        paymentOption: parsedData.payment?.paymentOption,
        totalPayment,
        paymentStatus: 'Pending',
      },
    };

    const registration = new NZSIRegistration(registrationData);
    await registration.save();
    console.log('createNZSIRegistration: Registration saved', { registrationId: registration._id });

    // Use req.headers.origin as fallback for FRONTEND_URL
    const origin = req.headers.origin || process.env.FRONTEND_URL || 'https://localhost:3000';
    if (!origin.startsWith('http')) {
      throw new Error('Invalid frontend URL configuration. Please contact support.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'NZ South Island 2025 Registration',
              description: `Registration for ${parsedData.personalDetails?.firstName} ${parsedData.personalDetails?.lastName}`,
            },
            unit_amount: Math.round(totalPayment * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/registration/success?session_id={CHECKOUT_SESSION_ID}&registrationId=${registration._id}`,
      cancel_url: `${origin}/registration/cancel?registrationId=${registration._id}`,
      metadata: { registrationId: registration._id.toString() },
    });
    console.log('createNZSIRegistration: Stripe session created', { sessionId: session.id });

    // Verify email transporter
    await verifyTransporter();

    const emailStatus = { userEmailSent: false, adminEmailSent: false, errors: [] };
    try {
      console.log('createNZSIRegistration: Sending user email to', parsedData.personalDetails?.email);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: parsedData.personalDetails?.email,
        subject: 'NZ South Island 2025 Registration Confirmation',
        html: `
          <h2>Registration Confirmation</h2>
          <p>Dear ${parsedData.personalDetails?.firstName},</p>
          <p>Your registration for NZ South Island 2025 has been received.</p>
          <p>Total Payment: $${totalPayment.toFixed(2)}</p>
          <p>Please complete the payment via the provided link.</p>
        `,
      });
      console.log('createNZSIRegistration: User email sent successfully');
      emailStatus.userEmailSent = true;
    } catch (err) {
      console.error('createNZSIRegistration: User email error', { error: err.message });
      emailStatus.errors.push(`User email failed: ${err.message}`);
    }

    try {
      console.log('createNZSIRegistration: Sending admin email to', process.env.ADMIN_EMAIL);
      const adminEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New NZSI Registration',
        html: `
          <h2>New Registration</h2>
          <p>Name: ${parsedData.personalDetails?.firstName} ${parsedData.personalDetails?.lastName}</p>
          <p>Email: ${parsedData.personalDetails?.email}</p>
          <p>Total Payment: $${totalPayment.toFixed(2)}</p>
          <p>Registration ID: ${registration._id}</p>
          ${licenceFilePath ? `<p>License File: Attached</p>` : '<p>No license file provided</p>'}
        `,
      };

      if (licenceFilePath) {
        adminEmailOptions.attachments = [
          {
            filename: req.file.originalname,
            path: licenceFilePath,
            contentType: req.file.mimetype,
          },
        ];
      }

      await transporter.sendMail(adminEmailOptions);
      console.log('createNZSIRegistration: Admin email sent successfully');
      emailStatus.adminEmailSent = true;
    } catch (err) {
      console.error('createNZSIRegistration: Admin email error', { error: err.message });
      emailStatus.errors.push(`Admin email failed: ${err.message}`);
    }

    res.status(201).json({
      registrationId: registration._id,
      emailStatus,
      paymentSessionId: session.id,
    });
  } catch (error) {
    console.error('createNZSIRegistration: Error', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: error.message });
  }
};

// Add this to controllers/nzsiRegistrationController.js
export const getAllRegistrations = async (req, res) => {
  try {
    console.log('getAllRegistrations: Fetching all NZSI registrations');
    const registrations = await NZSIRegistration.find()
      .populate('userId', 'email firstName lastName') // Optional: populate user info
      .sort({ createdAt: -1 }); // Most recent first

    console.log('getAllRegistrations: Found', registrations.length, 'registrations');
    res.status(200).json(registrations);
  } catch (error) {
    console.error('getAllRegistrations: Error', error.message);
    res.status(500).json({ message: 'Failed to fetch registrations', error: error.message });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id; // From protect middleware
    console.log('getUserRegistrations: Fetching registrations for user', userId);
    const registrations = await NZSIRegistration.find({ userId })
      .sort({ createdAt: -1 });
    console.log('getUserRegistrations: Found', registrations.length, 'registrations');
    if (!registrations.length) {
      return res.status(404).json({ message: 'No registrations found for this user' });
    }
    res.status(200).json(registrations);
  } catch (error) {
    console.error('getUserRegistrations: Error', error.message);
    res.status(500).json({ message: 'Failed to fetch user registrations', error: error.message });
  }
};