import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Register request received for:", email);

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received for:", email);

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);

    // Compare entered password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password attempt for user:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Password valid for user:", email);

    // Log the JWT_SECRET to check if it's properly loaded
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Assign role based on email domain
    let role = "customer";
    if (email.endsWith("@hotmail.com")) {
      role = "admin";
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, token generated for:", email);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export { registerUser, loginUser };
