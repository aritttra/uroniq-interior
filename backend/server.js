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

  // Check if SMTP is configured
  const hasSmtpConfig = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!hasSmtpConfig) {
    console.warn(`[WARNING] SMTP credentials are not configured in .env. Returning reference number ${refNumber} without sending email.`);
    return res.status(200).json({
      success: true,
      refNumber,
      message: 'Consultation received (SMTP not configured, email not sent).'
    });
  }

  // Set up Nodemailer Transporter with connection timeouts
  const port = parseInt(process.env.SMTP_PORT || "465");
  const isSecure = process.env.SMTP_SECURE !== undefined 
    ? process.env.SMTP_SECURE === "true" 
    : port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: port,
    secure: isSecure,
    connectionTimeout: 15000, // 15 seconds
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

  // Prepare HTML Email Template
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #0d0d0d;
          color: #f2f2f2;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #141414;
          border: 1px solid #d4af37;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        .header {
          background-color: #0a0a0a;
          padding: 30px;
          text-align: center;
          border-bottom: 2px solid #d4af37;
        }
        .header h1 {
          color: #d4af37;
          margin: 0;
          font-size: 24px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .content {
          padding: 30px;
        }
        .ref-box {
          background-color: rgba(212, 175, 55, 0.1);
          border: 1px dashed #d4af37;
          padding: 15px;
          text-align: center;
          margin-bottom: 30px;
          border-radius: 4px;
        }
        .ref-number {
          font-size: 20px;
          font-weight: bold;
          color: #d4af37;
          letter-spacing: 1px;
        }
        .section-title {
          color: #d4af37;
          font-size: 16px;
          border-bottom: 1px solid #333;
          padding-bottom: 8px;
          margin-top: 25px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td {
          padding: 10px 0;
          vertical-align: top;
        }
        .label {
          color: #888888;
          width: 150px;
          font-weight: bold;
          font-size: 14px;
        }
        .value {
          color: #ffffff;
          font-size: 14px;
        }
        .desc-text {
          background-color: #1a1a1a;
          padding: 15px;
          border-radius: 4px;
          border-left: 3px solid #d4af37;
          font-style: italic;
          color: #dddddd;
          line-height: 1.6;
        }
        .footer {
          background-color: #0a0a0a;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666666;
          border-top: 1px solid #222;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nüvo Consultation Request</h1>
        </div>
        <div class="content">
          <div class="ref-box">
            <div style="font-size: 12px; color: #888; margin-bottom: 5px;">REFERENCE NUMBER</div>
            <div class="ref-number">${refNumber}</div>
          </div>

          <div class="section-title">Client Details</div>
          <table>
            <tr>
              <td class="label">Name:</td>
              <td class="value">${name}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td class="value"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td class="value"><a href="tel:${phone}" style="color: #d4af37; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td class="label">Location:</td>
              <td class="value">${city}</td>
            </tr>
          </table>

          <div class="section-title">Project Scope</div>
          <table>
            <tr>
              <td class="label">Service Category:</td>
              <td class="value" style="color: #d4af37; font-weight: bold;">${service}</td>
            </tr>
            <tr>
              <td class="label">Property Type:</td>
              <td class="value">${propertyType}</td>
            </tr>
            <tr>
              <td class="label">Property Size:</td>
              <td class="value">${propertySize}</td>
            </tr>
            <tr>
              <td class="label">Estimated Budget:</td>
              <td class="value">${budget}</td>
            </tr>
            <tr>
              <td class="label">Preferred Timeline:</td>
              <td class="value">${timeline}</td>
            </tr>
            <tr>
              <td class="label">Design Styles:</td>
              <td class="value">${Array.isArray(styles) ? styles.join(', ') : styles}</td>
            </tr>
          </table>

          <div class="section-title">Client Vision</div>
          <div class="desc-text">
            "${(description || "").replace(/\n/g, "<br>")}"
          </div>
        </div>
        <div class="footer">
          This is an automated notification of a lead captured on the Nüvo website.
        </div>
      </div>
    </body>
    </html>
  `;

  // Prepare Client Confirmation Email Template
  const clientEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #0d0d0d;
          color: #f2f2f2;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #141414;
          border: 1px solid #d4af37;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }
        .header {
          background-color: #0a0a0a;
          padding: 30px;
          text-align: center;
          border-bottom: 2px solid #d4af37;
        }
        .header h1 {
          color: #d4af37;
          margin: 0;
          font-size: 24px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .content {
          padding: 30px;
          line-height: 1.6;
        }
        .ref-box {
          background-color: rgba(212, 175, 55, 0.1);
          border: 1px dashed #d4af37;
          padding: 15px;
          text-align: center;
          margin-bottom: 30px;
          border-radius: 4px;
        }
        .ref-number {
          font-size: 20px;
          font-weight: bold;
          color: #d4af37;
          letter-spacing: 1px;
        }
        h2 {
          color: #ffffff;
          font-size: 18px;
          margin-top: 0;
        }
        p {
          font-size: 14px;
          color: #cccccc;
        }
        .highlight {
          color: #d4af37;
          font-weight: bold;
        }
        .divider {
          border-top: 1px solid #333;
          margin: 25px 0;
        }
        .steps {
          margin-left: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #bbbbbb;
        }
        .steps li {
          margin-bottom: 10px;
        }
        .footer {
          background-color: #0a0a0a;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666666;
          border-top: 1px solid #222;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nüvo Design Studio</h1>
        </div>
        <div class="content">
          <h2>Thank you for reaching out, ${name}.</h2>
          <p>
            We have received your interest in our <span class="highlight">${service}</span> service. 
            Our elite design team is reviewing your requirements, and we are excited to help you transform your space.
          </p>

          <div class="ref-box">
            <div style="font-size: 12px; color: #888; margin-bottom: 5px;">YOUR REFERENCE NUMBER</div>
            <div class="ref-number">${refNumber}</div>
          </div>

          <div class="divider"></div>

          <h2>What Happens Next?</h2>
          <ul class="steps">
            <li><strong>Initial Review:</strong> A senior designer reviews your preferences, timeline, budget, and design vision.</li>
            <li><strong>Contact:</strong> We will reach out to you at <span class="highlight">${phone}</span> or <span class="highlight">${email}</span> within 24-48 business hours to discuss details and schedule a design call.</li>
            <li><strong>Consultation:</strong> We'll compile high-level moodboards and spatial outlines based on your chosen style.</li>
          </ul>

          <div class="divider"></div>

          <p style="text-align: center; font-style: italic; color: #888; font-size: 13px;">
            "Simplicity is the ultimate sophistication."
          </p>
        </div>
        <div class="footer">
          Nüvo Interiors © 2026. All rights reserved.<br>
          This is an automated confirmation of your request.
        </div>
      </div>
    </body>
    </html>
  `;

  // Check if Resend API key is provided
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const recipient = process.env.RECEIVER_EMAIL || 'aritrakundu.in@gmail.com';
      
      await Promise.all([
        resend.emails.send({
          from: 'Nüvo Interiors <onboarding@resend.dev>',
          to: recipient,
          subject: `New Lead: [${refNumber}] - ${service} by ${name}`,
          html: emailHtml,
          reply_to: email
        }),
        resend.emails.send({
          from: 'Nüvo Interiors <onboarding@resend.dev>',
          to: email,
          subject: `Thank you for reaching out to Nüvo - Ref: ${refNumber}`,
          html: clientEmailHtml
        })
      ]);

      console.log(`[SUCCESS] Resend emails dispatched for reference ${refNumber}`);
      return res.status(200).json({
        success: true,
        refNumber,
        message: 'Consultation request sent successfully via Resend.'
      });
    } catch (resendError) {
      console.error(`[ERROR] Resend API failed:`, resendError);
    }
  }

  // Fallback to Nodemailer SMTP
  const adminMailOptions = {
    from: `"Nüvo Interiors" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || 'aritrakundu.in@gmail.com',
    subject: `New Lead: [${refNumber}] - ${service} by ${name}`,
    html: emailHtml,
    replyTo: email
  };

  const clientMailOptions = {
    from: `"Nüvo Interiors" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for reaching out to Nüvo - Ref: ${refNumber}`,
    html: clientEmailHtml
  };

  try {
    const [adminInfo, clientInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    console.log(`[SUCCESS] Admin email sent: ${adminInfo.messageId}, Client email sent: ${clientInfo.messageId} for reference ${refNumber}`);
    res.status(200).json({
      success: true,
      refNumber,
      message: 'Consultation request sent successfully. Confirmation email dispatched to client.'
    });
  } catch (error) {
    console.error(`[ERROR] Failed to send email via SMTP:`, error);
    res.status(200).json({
      success: true,
      refNumber,
      message: 'Consultation request received successfully.'
    });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`[SERVER] Nüvo backend listening on port ${PORT}`);
});
