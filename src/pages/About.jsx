import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div>
      <header>
        <div className="nav-container">
          <div className="logo">SkillBridge</div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Find Jobs</Link>
              </li>
              <li>
                <Link to="/gig">Post a Gig</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/profile">
                  <img
                    src="/path/to/profile-icon.png"
                    alt="Profile"
                    className="nav-profile"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <h1>Welcome to the SkillBridge!</h1>
          <p>
            Are you an African graduate student looking to expand your skills,
            earn money, and build professional connections? You’re in the right
            place! Our community connects talented graduate students with
            freelancing opportunities while fostering mentorship, collaboration,
            and growth.
          </p>
        </section>

        <section className="content-section">
          <h2>Why Join Our Community?</h2>
          <ul>
            <li>
              Network with like-minded professionals and industry experts.
            </li>
            <li>
              Access exclusive freelance opportunities that match your skills.
            </li>
            <li>
              Participate in workshops, webinars, and mentorship programs.
            </li>
            <li>Showcase your talent and success stories.</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>How to Get Involved</h2>
          <ul>
            <li>Sign up to join our growing community.</li>
            <li>Engage with us on LinkedIn, Twitter, and Facebook.</li>
            <li>Attend our events and webinars to enhance your skills.</li>
            <li>Find collaborators for your freelance projects.</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Community Guidelines</h2>
          <ul>
            <li>Be respectful and professional.</li>
            <li>No spam or self-promotion (unless allowed).</li>
            <li>Give constructive feedback.</li>
            <li>Keep discussions relevant to freelancing and career growth.</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Featured Members & Success Stories</h2>
          <ul>
            <li>
              <strong>[Member Name]</strong> – Earned $5,000 in first 3 months!
            </li>
            <li>
              <strong>[Another Member]</strong> – Landed a full-time role
              through freelancing!
            </li>
            <li>Want to be featured? Share your story with us!</li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Upcoming Events & Webinars</h2>
          <ul>
            <li>
              Freelancing 101 – <strong>March 25, 2025</strong>
            </li>
            <li>
              Winning Portfolio Workshop – <strong>April 10, 2025</strong>
            </li>
            <li>
              Setting Competitive Rates – <strong>May 5, 2025</strong>
            </li>
            <li>
              <em>Register early to secure your spot!</em>
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Need Help?</h2>
          <p>
            For questions or support, contact us at{" "}
            <a href="mailto:support@skillbridge.com">support@skillbridge.com</a>{" "}
            or visit our FAQ page.
          </p>
          <p>
            Let’s build a thriving freelance economy for African graduate
            students!
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>SkillBridge</h3>
            <p>Bridging the gap for African student freelancers</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Find Jobs</Link>
              </li>
              <li>
                <Link to="/gig">Post a Gig</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: info@skillbridge.africa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
