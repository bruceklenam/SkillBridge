import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo">SkillBridge</div>
        <ul className="nav-links">
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
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </Link>
          </li>
        </ul>
      </nav>

      <header>
        <h1>Welcome to your profile</h1>
        <p>
          Here you can view your profile information, update your profile, and
          view your job applications
        </p>
        <div>
          <img className="profile-image" alt="Profile" />
        </div>
        <div className="hero-buttons">
          <button className="btn dark">Update Profile</button>
          <button className="btn light">View Applications</button>
        </div>
      </header>

      <section className="about">
        <h2>About</h2>
        <p>
          I am an illustrator, an animator, a digital artist, and a comic and
          manga artist. Have you ever wished your dream manga or comic would
          come to life? Turning dreams into reality is what I'm all about! With
          my expertise in comic and manga illustration, I'm here to transform
          your captivating stories into visually stunning masterpieces that will
          captivate your audience. No more worrying about your ideas going
          unnoticed - together, we'll bring them to life in a way that resonates
          with your dream audience. Let's collaborate and make magic happen!
        </p>
        <div>
          <button className="Edit-details">+ Edit details</button>
        </div>
      </section>

      <section className="education">
        <p>Back up your skills by adding any education degrees or programs</p>
        <div>
          <button className="Add-education">+ Add Education</button>
        </div>
      </section>

      <section className="skills">
        <p>
          Attract and impress potential clients by showcasing your skills and
          best works
        </p>
        <div>
          <button className="Add-skills">+ Add Skills</button>
        </div>
        <div>
          <button className="Add-portfolio">+ Add Portfolio</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h3>SkillBridge</h3>
          <p>Bridging the gap for African student freelancers</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Home | Find Jobs | Learn | Community</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@skillbridge.africa</p>
        </div>
      </footer>
    </main>
  );
}

export default Profile;
