import React from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";
import ProposalForm from "./ProposalForm";

function Jobs() {
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

   
      <section class="intro-section">
            <h1>Find Freelance Jobs</h1>
            <p>Browse freelance gigs tailored for African graduate students. Start your journey today!</p>
        </section>


        <section class="filters">
            <input type="text" placeholder="Search for jobs..." />
            <select>
                <option value="">All Categories</option>
                <option value="design">Illustration & Design</option>
                <option value="writing">Writing</option>
                <option value="data">Data Analysis</option>
                <option value="social-media">Social Media</option>
            </select>
            <select>
                <option value="">Budget Range</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-300">$100 - $300</option>
                <option value="300-500">$300 - $500</option>
                <option value="500+">$500+</option>
            </select>
            <button>Filter</button>
        </section>

  
        <section class="jobs-grid">
            
            <div class="job-card">
                <h3>Graphic Designer</h3>
                <p>Design social media posts for a growing tech startup.</p>
                <div class="job-meta">
                    <span>Budget: $300</span>
                    <span>Deadline: April 15, 2025</span>
                </div>
                <button>Apply Now</button>
            </div>


            <div class="job-card">
                <h3>Content Writer</h3>
                <p>Create blog articles for a fintech platform focused on startups.</p>
                <div class="job-meta">
                    <span>Budget: $200</span>
                    <span>Deadline: April 5, 2025</span>
                </div>
                <button>Apply Now</button>
            </div>


            <div class="job-card">
                <h3>Data Analyst</h3>
                <p>Analyze customer data for a logistics company and provide insights.</p>
                <div class="job-meta">
                    <span>Budget: $500</span>
                    <span>Deadline: April 20, 2025</span>
                </div>
                <button>Apply Now</button>
            </div>


            <div class="job-card">
                <h3>Social Media Manager</h3>
                <p>Manage and grow Instagram & Twitter accounts for a fashion brand.</p>
                <div class="job-meta">
                    <span>Budget: $400</span>
                    <span>Deadline: April 12, 2025</span>
                </div>
                <button>Apply Now</button>
            </div>
       

            <div class="job-card">
                <h3>SEO Content Strategist</h3>
                <p>Develop high-ranking blog content for a growing SaaS company. Must have experience in keyword research and content marketing.</p>
                <div class="job-meta">
                <span>Budget: $350</span>
                <span>Deadline: April 10, 2025</span>
                </div>
               <Link to={ProposalForm} ><button>Apply</button> </Link>
            </div>


            <div class="job-card">
                <h3>Senior Mobile App Developer (React Native)</h3>
                <p>Build a cross-platform e-commerce app with seamless checkout and AI-driven recommendations.</p>
                <div class="job-meta">
                <span>Budget: $2,500</span>
                <span>Deadline: May 5, 2025</span>
                </div>
                <button>Apply</button>
            </div>
            

            <div class="job-card">
                <h3>Blockchain Smart Contract Developer</h3>
                <p>Develop and audit secure smart contracts for an NFT marketplace. Solidity and Web3 expertise required.</p>
                <div class="job-meta">
                <span>Budget: $4,000</span>
                <span>Deadline: June 1, 2025</span>
                </div>
                <button>Apply</button>
            </div>
            </section>

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
  );
}

export default Jobs;
