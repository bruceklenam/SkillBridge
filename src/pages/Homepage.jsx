import "./Homepage.css";

function Homepage() {
  return (
    <main>
      <nav class="navbar">
        <div class="logo">SkillBridge</div>
        <ul class="nav-links">
          <li>
            <a href="index.html" class="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">Find Jobs</a>
          </li>
          <li>
            <a href="#">Learn</a>
          </li>
          <li>
            <a href="#">Community</a>
          </li>
        </ul>

        <div className="signuplogin">
          <button
            class="signup-btn"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign Up
          </button>
          <button
            class="login-btn"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>
        </div>

        <div class="menu-toggle">&#9776;</div>
      </nav>

      <header class="hero">
        <h1>Bridging the gap for African Student Freelancers</h1>
        <p>
          Connect with opportunities, build your skills, and launch your
          freelance career
        </p>
        <div class="hero-buttons">
          <button class="btn dark">Get Started</button>
          <button class="btn light">Learn More</button>
        </div>
      </header>

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
