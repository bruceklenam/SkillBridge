import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Gig from "./pages/Gig";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import EditProfile from "./pages/EditProfile";
import ProposalForm from "./pages/ProposalForm";
import ProposalReview from "./pages/ProposalReview";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/gig" element={<Gig />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/proposalform" element={<ProposalForm/>}/>
        <Route path="/proposalreview" element={<ProposalReview/>}/>
      </Routes>
    </Router>
  );
}

export default App;
