require("dotenv").config();
require("./src/cron/perkToggle.cron");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./src/middlewares/error.middleware");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize"); // 
const xss = require("xss-clean");  // 
const rateLimit = require("express-rate-limit");
//const bcrypt = require("bcrypt");
const logger = require("./src/middlewares/logger.middleware");


 // Utility function to generate JWT tokens for authentication and authorization purposes
const generateTokens = require("./src/utils/generateTokens"); // correct 
const sequelize = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const petRoutes = require("./src/routes/pet.routes");
const perkRoutes = require("./src/routes/perk.routes");
const walletRoutes = require("./src/routes/wallet.routes");
const meetingRoutes = require("./src/routes/meeting.routes");
const adminRoutes = require("./src/routes/admin.routes");
const adoptionRoutes = require("./src/routes/adoption.routes");
const supportRoutes = require("./src/routes/support.routes");
const chatRoutes = require("./src/routes/chat.routes");
const shelterRoutes = require("./src/routes/shelter.routes");

const reviewRoutes = require("./src/routes/review.routes");
const stripeRoutes = require("./src/routes/stripe.routes");



const app = express(); // Create Express app instance 


app.set("trust proxy", 1); //For production behind load balancers.



app.use(cors()); // Enable CORS for all routes
// Stripe webhook requires raw body, so we need to set up a specific route for it before the general JSON parser
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json()); // for parsing application/json

app.use(helmet());  // Set security-related HTTP headers and protect against common vulnerabilities
app.use(morgan("dev"));  // Log HTTP requests in development format and output to console for debugging and monitoring purposes


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Rate limit exceeded: ${req.ip}`);
    res.status(429).json({
      message: "Too many login attempts. Try again later.",
    });
  },
});

// Route wiring means connecting routes to controllers and middlewares
app.use("/api/auth/login", limiter); // Apply rate limiter only to login route
app.use("/api/auth", authRoutes); // Use auth routes for all /api/auth/* endpoints
app.use("/api/pets", petRoutes);
app.use("/api/perks", perkRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/adoption", adoptionRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/stripe", stripeRoutes);  // Stripe webhook route for handling payment events from Stripe 
app.use(errorHandler); // Global error handling middleware
app.use(logger);

const PORT = process.env.PORT || 5000;

// Sync DB DATABASE CONNECTION
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });
