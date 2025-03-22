import React from "react";  
import { Link } from "react-router-dom";
import "./ProposalReview.css";

function ProposalReview() {
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
                  <div class="container">
        <h2>Review Proposal</h2>
        <div class="proposal-card">
            <h3>Job Title: Blog Article for Tech Website</h3>
            <p><strong>Freelancer:</strong> Jane Doe</p>
            <p><strong>Proposal Message:</strong> I am excited to work on your project and deliver a high-quality blog article tailored to your target audience. I have 3 years of experience in tech writing and SEO.</p>
            <p><strong>Proposed Budget:</strong> $150</p>
            <p><strong>Timeline:</strong> 5 days</p>
            <p><strong>Attachments:</strong> <a href="#">writing_sample.pdf</a></p>

            <div class="btn-group">
                <button class="btn accept">Accept Proposal</button>
                <button class="btn reject">Reject Proposal</button>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <h3>SkillBridge</h3>
                <p>Bridging the gap for African student freelancers</p>
            </div>
            <div class="footer-column">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Find Jobs</a></li>
                    <li><a href="#">Learn</a></li>
                    <li><a href="#">Community</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Contact</h3>
                <p>Email: info@skillbridge.africa</p>
            </div>
        </div>
    </footer>

        </main>
    )
}

export default ProposalReview;