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
    <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; padding: 40px 20px; border-radius: 8px;">
      <div style="background-color: #1a1a1a; padding: 40px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <h2 style="font-family: 'Playfair Display', Georgia, serif; color: #d4af37; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; font-size: 26px; font-weight: 400; letter-spacing: 0.5px;">New Consultation Request</h2>
        <div style="margin-bottom: 30px;">
          <span style="background-color: rgba(212, 175, 55, 0.1); color: #d4af37; padding: 6px 12px; border-radius: 4px; font-weight: 500; font-size: 14px; border: 1px solid rgba(212, 175, 55, 0.2);">Ref: ${refNumber}</span>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; width: 35%; color: #9ca3af;">Name:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${name}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Email:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Phone:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${phone}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">City:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${city}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Service:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${service}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Property Type:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${propertyType}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Property Size:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${propertySize}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Budget:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${budget}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Timeline:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${timeline}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #9ca3af;">Styles:</td><td style="padding: 12px 0; border-bottom: 1px solid #333; color: #ffffff;">${styles}</td></tr>
        </table>
        
        <div style="margin-top: 30px; padding: 20px; background-color: rgba(26, 26, 26, 0.6); border-radius: 8px; border-left: 3px solid #d4af37;">
          <h3 style="margin-top: 0; color: #ffffff; font-size: 16px; font-weight: 500;">Additional Details</h3>
          <p style="margin-bottom: 0; color: #9ca3af; line-height: 1.6; font-size: 14px;">${description || 'No additional details provided.'}</p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 30px; color: #555; font-size: 12px; font-family: 'Inter', sans-serif;">
        <p>This is an automated message from the Uroniq Interiors portal.</p>
      </div>
    </div>
  `;

  const clientEmailHtml = `
    <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; padding: 40px 20px; border-radius: 8px;">
      <div style="background-color: #1a1a1a; padding: 40px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px; font-weight: 400;">URONIQ</h1>
          <p style="color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 4px; margin-top: 8px; font-weight: 500;">Interiors</p>
        </div>
        
        <h2 style="font-family: 'Playfair Display', Georgia, serif; color: #ffffff; font-size: 22px; text-align: center; margin-bottom: 25px; font-weight: 400;">Thank you for reaching out, ${name}.</h2>
        
        <p style="color: #e5e7eb; line-height: 1.7; font-size: 15px; text-align: center;">We have successfully received your consultation request for <strong style="color: #ffffff; font-weight: 500;">${service}</strong>.</p>
        
        <div style="background-color: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
          <p style="margin: 0; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Reference Number</p>
          <p style="margin: 8px 0 0; color: #d4af37; font-size: 24px; font-weight: 400; font-family: 'Playfair Display', Georgia, serif; letter-spacing: 1px;">${refNumber}</p>
        </div>
        
        <p style="color: #e5e7eb; line-height: 1.7; font-size: 15px; text-align: center;">Our design team will carefully review your requirements and get back to you shortly to discuss the vision for your space.</p>
        
        <hr style="border: 0; border-top: 1px solid #333; margin: 35px 0;">
        
        <div style="text-align: center;">
          <p style="color: #9ca3af; line-height: 1.6; font-size: 14px; margin-bottom: 5px;">Warm regards,</p>
          <p style="color: #ffffff; font-weight: 500; font-size: 16px; margin-top: 0; font-family: 'Playfair Display', Georgia, serif; letter-spacing: 0.5px;">The Uroniq Interiors Team</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #555; font-size: 12px; line-height: 1.6; font-family: 'Inter', sans-serif;">
        <p style="margin: 0;">&copy; ${currentYear} Uroniq Interiors. All rights reserved.</p>
        <p style="margin: 5px 0 0;">For any immediate inquiries, simply reply to this email.</p>
      </div>
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
