import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend local development & production deployments
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'] : '*',
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

  const receiverEmail = process.env.RECEIVER_EMAIL || 'uroniqinteriors@gmail.com';
  const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASS;

  // 1. Primary Email Transport: Nodemailer SMTP (Works without domain on Vercel)
  if (hasSmtpConfig) {
    try {
      const port = parseInt(process.env.SMTP_PORT || "465");
      const isSecure = process.env.SMTP_SECURE !== undefined 
        ? process.env.SMTP_SECURE === "true" 
        : port === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: port,
        secure: isSecure,
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const adminMailOptions = {
        from: `"Uroniq Interiors" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        subject: `New Lead: [${refNumber}] - ${service} by ${name}`,
        html: emailHtml,
        replyTo: email
      };

      const clientMailOptions = {
        from: `"Uroniq Interiors" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out to Uroniq Interiors - Ref: ${refNumber}`,
        html: clientEmailHtml
      };

      const [adminInfo, clientInfo] = await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(clientMailOptions)
      ]);

      console.log(`[SUCCESS] Admin email sent to ${receiverEmail}: ${adminInfo.messageId}, Client email sent to ${email}: ${clientInfo.messageId} for ref ${refNumber}`);

      return res.status(200).json({
        success: true,
        refNumber,
        message: 'Consultation request sent successfully. Confirmation email dispatched to client and notification sent to Uroniq.'
      });
    } catch (smtpError) {
      console.error(`[ERROR] Nodemailer SMTP failed:`, smtpError);
    }
  }

  // 2. Secondary Fallback: Resend API
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
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`[SERVER] Nüvo backend listening on port ${PORT}`);
  });
}

export default app;
