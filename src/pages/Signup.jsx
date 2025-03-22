import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo">SkillBridge</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className="signup-container">
        <h2>Create Your Account</h2>

        <button className="social-btn google">Sign up with Google</button>
        <button className="social-btn linkedin">Sign up with LinkedIn</button>
        <div className="separator">
          <span>or</span>
        </div>

        <form id="signup-form">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            required
          />

          <label htmlFor="role">I am a:</label>
          <select id="role">
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="freelancer">Freelancer</option>
            <option value="employer">Employer</option>
          </select>

          <div className="terms">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
