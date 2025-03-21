const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator"); 
const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");

const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const saltRounds = 10;

// configure nodemailer trnsporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// signup with input validation
router.post(
  "/signup",
  [
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 2 })
      .withMessage("Full name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),
    body("role")
      .isIn(["business", "mentor", "student"])
      .withMessage("Role must be business, mentor, or student"),
    body("about")
      .if(body("role").equals("business"))
      .notEmpty()
      .withMessage("About section is required for business role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, role, about } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
        about: about || "",
        skills: [],
        education: [],
        portfolio: [],
        services: [],
        rating: 0,
        balance: 0,
        businessProfile: role === "business" ? { about, location: "" } : null,
      });

      await user.save();
      const token = generateToken(user);
      res.status(201).json({ token, message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// login with input validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user);
      res.status(200).json({ token, message: "Logged in successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// forgot password
router.post(
  "/forgotPassword",
  [body("email").isEmail().withMessage("Invalid email address")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // generate a reset token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // save the token in the database
      const resetToken = new PasswordResetToken({
        userId: user._id,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour 
      });
      await resetToken.save();

      // send reset email
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "SkillBridge Password Reset",
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}\n\nThis link will expire in 1 hour.`,
        html: `<p>You requested a password reset.</p><p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p><p>This link will expire in 1 hour.</p>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: `Failed to send reset email: ${error.message}` });
    }
  }
);

// reset password
router.post(
  "/resetPassword",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("New password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("New password must contain at least one number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, newPassword } = req.body;

    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const resetToken = await PasswordResetToken.findOne({ token, userId: decoded.userId });

      if (!resetToken) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }

      if (resetToken.expiresAt < new Date()) {
        return res.status(400).json({ error: "Reset token has expired" });
      }

      // Update the user's password
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.password = await bcrypt.hash(newPassword, saltRounds);
      await user.save();

      // delete  used reset token
      await PasswordResetToken.deleteOne({ token });

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ error: "Reset token has expired" });
      }
      res.status(500).json({ error: `Failed to reset password: ${error.message}` });
    }
  }
);

// Google Sign-In 
router.post("/googleSignIn", async (req, res) => {
  const { idToken, role } = req.body;
  if (!idToken || !role) {
    return res.status(400).json({ error: "idToken and role are required" });
  }
  if (!["business", "mentor", "student"].includes(role)) {
    return res.status(400).json({ error: "Role must be business, mentor, or student" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName: name,
        email,
        role,
        about: role === "business" ? "Please update your about section" : "",
        skills: [],
        education: [],
        portfolio: [],
        services: [],
        rating: 0,
        balance: 0,
        businessProfile:
          role === "business"
            ? { about: "Please update your about section", location: "" }
            : null,
      });
      await user.save();
    } else {
      user.role = role;
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ token, message: "Signed in with Google successfully" });
  } catch (error) {
    res.status(500).json({ error: `Google sign-in failed: ${error.message}` });
  }
});

// LinkedIn Sign-In 
router.post("/linkedinSignIn", async (req, res) => {
  const { code, role } = req.body;
  if (!code || !role) {
    return res.status(400).json({ error: "Authorization code and role are required" });
  }
  if (!["business", "mentor", "student"].includes(role)) {
    return res.status(400).json({ error: "Role must be business, mentor, or student" });
  }

  const linkedinConfig = {
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/auth/linkedin/callback",
  };

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: linkedinConfig.redirect_uri,
        client_id: linkedinConfig.client_id,
        client_secret: linkedinConfig.client_secret,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });
    const profileData = profileResponse.data;
    const emailResponse = await axios.get(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );
    const emailData = emailResponse.data;
    const email = emailData.elements[0]["handle~"].emailAddress;
    const fullName = profileData.localizedFirstName + " " + profileData.localizedLastName;
    const linkedinId = profileData.id;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName,
        email,
        role,
        about: role === "business" ? "Please update your about section" : "",
        skills: [],
        education: [],
        portfolio: [],
        services: [],
        rating: 0,
        balance: 0,
        businessProfile:
          role === "business"
            ? { about: "Please update your about section", location: "" }
            : null,
      });
      await user.save();
    } else {
      user.role = role;
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ token, message: "Signed in with LinkedIn successfully" });
  } catch (error) {
    res.status(500).json({ error: `LinkedIn sign-in failed: ${error.message}` });
  }
});

module.exports = router;
