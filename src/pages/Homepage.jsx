import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <main>
      <nav className="navbar">
        <div className="logo">SkillBridge</div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs">Find Jobs</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <section class="hero">
        <h1>Bridging the gap for African Student Freelancers</h1>
        <p>
          Connect with opportunities, build your skills, and launch your
          freelance career
        </p>
        <div className="signuplogin">
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </section>

      <section class="why-choose">
        <h2>Why Choose SkillBridge?</h2>
        <div class="features">
          <div class="feature-box">
            <h3>AI Powered Matching</h3>
            <p>Get matched with jobs based on your skills and coursework.</p>
          </div>
          <div class="feature-box">
            <h3>Learn by Doing</h3>
            <p>Build your portfolio through real-world projects.</p>
          </div>
          <div class="feature-box">
            <h3>Skill Verification</h3>
            <p>Earn micro-certifications to prove your expertise.</p>
          </div>
        </div>
      </section>

      <section class="categories">
        <h2>Explore Categories</h2>
        <div class="category-list">
          <div class="category-box">
            <img src="web-dev.jpg" alt="Web Development" />
            <p>Web Development</p>
          </div>
          <div class="category-box">
            <img src="graphic-design.jpg" alt="Graphic Design" />
            <p>Graphic Design</p>
          </div>
          <div class="category-box">
            <img src="content-writing.jpg" alt="Content Writing" />
            <p>Content Writing</p>
          </div>
          <div class="category-box">
            <img src="digital-marketing.jpg" alt="Digital Marketing" />
            <p>Digital Marketing</p>
          </div>
        </div>
      </section>

      <section class="how-it-works">
        <h2>How It Works</h2>
        <div class="steps">
          <div class="step">1. Create Profiles</div>
          <div class="step">2. Complete Projects</div>
          <div class="step">3. Get Verified</div>
          <div class="step">4. Start Earning</div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-section">
          <h3>SkillBridge</h3>
          <p>Bridging the gap for African student freelancers</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <p>Home | Find Jobs | Learn | Community</p>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>Email: info@skillbridge.africa</p>
        </div>
      </footer>
    </main>
  );
}

export default Homepage;
