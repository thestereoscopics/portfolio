// Vercel serverless function: POST /api/send-email
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  - from resend.com (doesn't expire)
//   CONTACT_FROM    - sender on your verified domain, e.g. "Jeremy Sell <contact@jeremysell.com>"
//   CONTACT_TO      - inbox that receives form messages

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str) =>
  str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]
  );

const sendEmail = async (payload) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = req.body ?? {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Honeypot: real visitors never see this field, bots fill it in.
  // Pretend it worked so they don't retry.
  if (body.website) {
    return res.status(200).json({ success: true });
  }

  if (
    !name ||
    !message ||
    !EMAIL_RE.test(email) ||
    name.length > 100 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Please check the form and try again." });
  }

  const myNotification = {
    from: process.env.CONTACT_FROM,
    to: process.env.CONTACT_TO,
    reply_to: email,
    subject: subject || `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  const userNotification = {
    from: process.env.CONTACT_FROM,
    to: email,
    subject: "Thank you for your message",
    text: `Hi ${name},\n\nThank you for reaching out to me. I have received your email, and I'll get back to you ASAP.\n\nBest,\nJeremy Sell`,
    html: `<div style="font-family:system-ui,sans-serif,Arial;font-size:16px">
            <p style="padding-top:16px;border-top:1px solid #eaeaea">Hi ${escapeHtml(name)},</p>
            <p>Thank you for reaching out to me. I have received your email, and I'll get back to you ASAP.</p>
            <p style="padding-top:16px;">Best,<br>Jeremy Sell</p>
            <span style="padding-top:16px;border-top:1px solid #eaeaea"></span>
          </div>`,
  };

  try {
    // Send mine first so a visitor never gets a confirmation for a message I didn't receive
    await sendEmail(myNotification);
    await sendEmail(userNotification);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong. Please try again later." });
  }
}
