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

      <div class="profile-container">


<div class="profile-header">
    <img src="https://via.placeholder.com/120" alt="Profile Picture"/>
    <h2>Barima Owusu Basoah</h2>
    <p>@bobby_nots | Kumasi, Ghana | Speaks English</p>
</div>


<div class="section about-section">
    <h3>About</h3>
    <a href="#" class="edit-btn">Edit</a>
    <p>I am an illustrator, animator, and digital artist. My goal is to help you bring your dream comic or manga to life! I specialize in captivating illustrations and storytelling that engage your audience.</p>
</div>


<div class="section info-section">
    <h3>Details</h3>
    <a href="#" class="edit-btn">Edit</a>
    <ul class="info-list">
        <li><strong>Location:</strong> Kumasi, Ghana</li>
        <li><strong>Languages:</strong> English</li>
        <li><strong>Rating:</strong> 5.9 / 6.0</li>
        <li><strong>Email:</strong> user@example.com</li>
        <li><strong>Joined:</strong> January 2024</li>
    </ul>
</div>


<div class="section">
    <h3>Skills</h3>
    <a href="#" class="edit-btn">Edit</a>
    <span class="tag">Illustration</span>
    <span class="tag">Character Design</span>
    <span class="tag">Digital Art</span>
    <span class="tag">Manga Artist</span>
    <span class="tag">Storyboarding</span>
</div>

<div class="section">
    <h3>Portfolio</h3>
    <a href="#" class="edit-btn">Edit</a>
    <div class="portfolio-grid">
        <div class="portfolio-item">
            <img src="https://via.placeholder.com/300x150" alt="Portfolio Item"/>
            <p>Comic Book Project</p>
        </div>
        <div class="portfolio-item">
            <img src="https://via.placeholder.com/300x150" alt="Portfolio Item"/>
            <p>Manga Character Designs</p>
        </div>
        <div class="portfolio-item">
            <img src="https://via.placeholder.com/300x150" alt="Portfolio Item"/>
            <p>Webtoon Panels</p>
        </div>
    </div>
</div>


<div class="section">
    <h3>Services</h3>
    <a href="#" class="edit-btn">Edit</a>
    <div class="service-card">
        <h4>Comic & Manga Illustration</h4>
        <p>High-quality comic and manga page illustrations tailored to your story. Starting at $100/page.</p>
    </div>
    <div class="service-card">
        <h4>Character Design</h4>
        <p>Unique and professional character designs for your series. Starting at $50 per character.</p>
    </div>
</div>

</div>

<footer>
&copy; 2025 SkillBridge | Empowering African student freelancers
</footer>

    </main>
  );
}

export default Profile;
