const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const paginate = require("express-paginate");
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");
const projectRoutes = require("./routes/projects");
const certificationRoutes = require("./routes/certifications");
const forumRoutes = require("./routes/forum");
const adminRoutes = require("./routes/admin");


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // will adjust later
    methods: ["GET", "POST"],
  },
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinRoom", (room) => socket.join(room));
  socket.on("disconnect", () => console.log("User disconnected"));
});

// Middleware
app.use(cors({ origin: true, credentials: true })); // enable CORS for mobile
app.use(express.json());
app.use(express.static("uploads")); // Serve uploaded files
app.use(paginate.middleware(10, 50)); // Pagination: 10 items/page, max 50

// Attach io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
