// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { sequelize } from "./config/db.js";  // Adjust according to your db.js file

// // 📌 Import Routes
// import orderRoutes from "./routes/orderRoutes.js";
// import orderItemRoutes from "./routes/orderItemRoutes.js";
// import userRoutes from "./routes/userRoutes.js"; // Assuming you have user routes
// import jerseyRoutes from "./routes/jerseyRoutes.js"; // Assuming you have jersey routes
// import { protect } from "./middleware/authMiddleware.js"; // Auth middleware for protected routes

// dotenv.config();

// const app = express();

// // 📌 Middleware Setup
// app.use(express.json()); // To parse JSON request bodies
// app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)

// app.use("/api/users", userRoutes);               // User API (sign up, sign in, etc.)

// // 📌 Test route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Jersey World");
// });


// // 📌 Error Handling (Optional: for unhandled routes)
// app.all("*", (req, res) => {
//   res.status(404).json({ message: "Route not found!" });
// });

// // 📌 Database Sync and Server Start
// const startServer = async () => {
//   try {
//     // Sync the models (tables)
//     await sequelize.sync({ force: false });  // Set force: true to reset tables (use cautiously)
//     console.log("Database synced successfully!");

//     // Start server
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server running on port ${process.env.PORT || 3000}`);
//     });
//   } catch (error) {
//     console.error("Error syncing the database:", error);
//     process.exit(1); // Exit with a failure code
//   }
// };

// startServer();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Assuming you have user routes
import { sequelize } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

// 📌 Middleware Setup
app.use(express.json()); // To parse JSON request bodies
app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)

// 📌 Import Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);               // User API (sign up, sign in, etc.)   

// 📌 Test route
app.get("/", (req, res) => {
  res.send("Welcome to the Jersey World");
});

// 📌 Error Handling (Optional: for unhandled routes)
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// 📌 Database Sync and Server Start
const startServer = async () => {
  try {
    // Sync the models (tables)
    await sequelize.sync({ force: false });  // Set force: true to reset tables (use cautiously)
    console.log("Database synced successfully!");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing the database:", error);
    process.exit(1); // Exit with a failure code
  }
};

startServer();