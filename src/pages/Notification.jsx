import React from "react"; // Import the React library
import { Link } from "react-router-dom"; // Import the Link component from the react-router-dom library to create a link to another page
import "./Notification.css"; // Import the Notification.css file to style the Notification component    

function Notification() { // Create a functional component called Notification
    return ( // Return the JSX code
        <main>
            <div class="container">
        <h2>Notifications Center</h2>
        <div class="tabs">
            <button class="tab-btn active" onclick="showTab('notifications')">Notifications</button>
            <button class="tab-btn" onclick="showTab('messages')">Messages</button>
            <button class="tab-btn" onclick="showTab('orders')">Orders</button>
        </div>

        <div id="notifications" class="tab-content active">
            <p>No new notifications.</p>
           
            <div class="item">You received a proposal from John Doe.</div>
            <div class="item">Your gig has been approved.</div>
        </div>

        <div id="messages" class="tab-content">
            <p>No new messages.</p>
            
            <div class="item"><strong>Jane:</strong> Can you deliver by Friday?</div>
            <div class="item"><strong>Mark:</strong> Thanks for completing the task!</div>
        </div>

        <div id="orders" class="tab-content">
            <p>No active orders.</p>
           
            <div class="item">Order #1234 - In Progress</div>
            <div class="item">Order #5678 - Completed</div>
        </div>
    </div>

    <script src="Notification.js"></script>
        </main>
    );  
}

export default Notification; // Export the Notification component