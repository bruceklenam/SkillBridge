import React from "react";
import { Link } from "react-router-dom";
import "./Gig.css";

function Gig() {
  return (
    <div>
      <Link to="/" className="back-button">
        Back to Home
      </Link>

      <header>
        <h1>SkillBridge - Create a New Gig</h1>
      </header>

      <div className="container">
        <h2>Create Your Gig</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Gig Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., I will design a logo for your business"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="">Select category</option>
              <option>Illustration & Design</option>
              <option>Writing</option>
              <option>Web Development</option>
              <option>Marketing & SEO</option>
              <option>Animation & Video</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Gig Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your gig in detail..."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter your price"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="delivery">Delivery Time (in days)</label>
            <input
              type="number"
              id="delivery"
              name="delivery"
              placeholder="e.g., 5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Required Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="e.g., Photoshop, Illustrator, Creativity"
              required
            />
          </div>

          <button type="submit">Create Gig</button>
        </form>
        <p className="note">
          Make sure your gig is clear and professional to attract more clients!
        </p>
      </div>
    </div>
  );
}

export default Gig;
