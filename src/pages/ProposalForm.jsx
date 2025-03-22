import React from "react";
import { Link } from "react-router-dom";
import "./ProposalForm.css";

function ProposalForm() {
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
        <h2>Submit a Proposal</h2>
        <form class="proposal-form">
            <label for="job-title">Job Title</label>
            <input type="text" id="job-title" name="job-title" placeholder="e.g., Blog Article for Tech Website" required/>

            <label for="proposal-message">Proposal Message</label>
            <textarea id="proposal-message" name="proposal-message" rows="5" placeholder="Write your proposal..." required></textarea>

            <label for="budget">Proposed Budget ($)</label>
            <input type="number" id="budget" name="budget" placeholder="e.g., 150" required/>

            <label for="timeline">Estimated Timeline (in days)</label>
            <input type="number" id="timeline" name="timeline" placeholder="e.g., 5" required/>

            <label for="attachment">Attach Sample/Document (optional)</label>
            <input type="file" id="attachment" name="attachment"/>

            <button type="submit" class="btn-submit">Submit Proposal</button>
        </form>
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

export default ProposalForm;