import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      // "http://localhost:8080",
      // "http://localhost:8081",
      // "http://localhost:3000/",
      "https://jeremysell.com",
      "https://www.jeremysell.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const myNotification = {
    from: email,
    to: process.env.EMAIL,
    subject: subject || `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  const userNotification = {
    from: "thestereoscopics@gmail.com", // Change to your desired recipient
    to: email,
    subject: "Thank you for your message",
    text: `Thank you for your message. We'll get back to you as soon as possible.`,
    html: `<div style="font-family:system-ui,sans-serif,Arial;font-size:16px">
            <p style="padding-top:16px;border-top:1px solid #eaeaea">Hi ${name},</p>
            <p>Thank you for reaching out to me. I have received your email, and I'll get back to you ASAP.</p>
            <p style="padding-top:16px;">Best,<br>Jeremy Sell</p>
            <span style="padding-top:16px;border-top:1px solid #eaeaea"></span>
          </div>`,
  };

  try {
    // need to send the first one and make sure it works before sending the second
    // do not set this up as a promise bc they may get an email and I may not if we do it that way
    await transporter.sendMail(myNotification);
    await transporter.sendMail(userNotification);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port);
