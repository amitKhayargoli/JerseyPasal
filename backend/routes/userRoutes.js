import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// // Admin routes
// router.get("/", protect, admin, getAllUsers);
// router.put("/:id", protect, admin, updateUserProfile); // Update user profile by admin
// router.delete("/:id", protect, admin, deleteUser);

export default router;