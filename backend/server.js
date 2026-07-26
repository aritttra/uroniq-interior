import express from 'express';
import cors from 'cors';

import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend local development & production deployments
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'https://uroniq-interior.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173'] : '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Uroniq Backend is running' });
});

// Endpoint to handle consultation submissions
app.post('/api/consultation', async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    service,
    propertyType,
    propertySize,
    budget,
    timeline,
    styles,
    description
  } = req.body;

  // Generate Reference Number
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const refNumber = `INT-${currentYear}-${randomNum}`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Consultation Request</h2>
      <p><strong>Reference Number:</strong> ${refNumber}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Property Type:</strong> ${propertyType}</p>
      <p><strong>Property Size:</strong> ${propertySize}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Styles:</strong> ${styles}</p>
      <p><strong>Description:</strong> ${description}</p>
    </div>
  `;

  const clientEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank you for reaching out, ${name}!</h2>
      <p>We have received your consultation request for <strong>${service}</strong>.</p>
      <p>Your reference number is: <strong>${refNumber}</strong></p>
      <p>Our team at Uroniq Interiors will review your request and get back to you shortly.</p>
      <br />
      <p>Best regards,</p>
      <p>The Uroniq Interiors Team</p>
    </div>
  `;

  const receiverEmail = process.env.RECEIVER_EMAIL || 'uroniqinteriors@gmail.com';
  // Use Resend API for email delivery
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const adminRes = await resend.emails.send({
        from: 'Uroniq Interiors <onboarding@resend.dev>',
        to: receiverEmail,
        subject: `New Lead: [${refNumber}] - ${service} by ${name}`,
        html: emailHtml,
        reply_to: email
      });

      console.log(`[RESEND ADMIN RESULT]:`, adminRes);

      try {
        const clientRes = await resend.emails.send({
          from: 'Uroniq Interiors <onboarding@resend.dev>',
          to: email,
          subject: `Thank you for reaching out to Uroniq Interiors - Ref: ${refNumber}`,
          html: clientEmailHtml
        });
        console.log(`[RESEND CLIENT RESULT]:`, clientRes);
      } catch (cErr) {
        console.warn(`[WARNING] Resend client confirmation skipped (testing domain restriction):`, cErr.message);
      }

      console.log(`[SUCCESS] Consultation request processed via Resend for ref ${refNumber}`);
      return res.status(200).json({
        success: true,
        refNumber,
        message: 'Consultation request sent successfully via Resend.'
      });
    } catch (resendError) {
      console.error(`[ERROR] Resend API failed:`, resendError);
    }
  }

  // 3. Fallback: Return reference number if no email service succeeded
  return res.status(200).json({
    success: true,
    refNumber,
    message: 'Consultation request received successfully.'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`[SERVER] Nüvo backend listening on port ${PORT}`);
});

export default app;
