import React from "react";
import { Link } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
    return (
        <main>
            <header>
                <Link to="/profile" className="back-button">
                    Back
                </Link>
            </header>

            <div class="container">
        <h2>Edit Profile</h2>

        <div class="profile-pic-section">
            <img src="default-profile.png" alt="Profile Picture" id="profileImage"/>
            <input type="file" id="upload" accept="image/*"/>
            <label for="upload">Change Profile Picture</label>
        </div>

        <form>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name"/>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email"/>
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter your phone number"/>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, Country"/>
            </div>
            <div class="form-group">
                <label>Languages Spoken</label>
                <input type="text" placeholder="e.g., English, French"/>
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea placeholder="Tell us about yourself"></textarea>
            </div>
            <div class="form-group">
                <label>Skills</label>
                <input type="text" placeholder="e.g., Web Developer, Content Writer"/>
            </div>

  
            <div class="form-group">
                <label>Upload Portfolio (Previous Works)</label>
                <input type="file" multiple accept=".pdf, .docx, .jpg, .png, .jpeg"/>
                <small>Upload documents, designs, or other work samples (multiple files allowed)</small>
            </div>


            <div class="form-group">
                <label>Services Offered</label>
                <textarea placeholder="List your services here, e.g., Website Design, Copywriting, SEO Audit"></textarea>
            </div>

            <button type="submit" class="save-btn">Save Changes</button>
        </form>
    </div>
    </main>
    );
}

export default EditProfile;