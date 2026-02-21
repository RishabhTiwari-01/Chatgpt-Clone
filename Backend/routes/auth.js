




import express from "express";
import User from "../models/User.js"; // Yaad se .js lagana
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ==========================================
// 1. REGISTER ROUTE (Naya User Banane Ke Liye)
// ==========================================
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check karo ki email aur password aaye hain ya nahi
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password both are compulasary" });
        }

        // Check karo user pehle se toh nahi hai
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "This email has already resister" });
        }

        // Password ko hash (secure) karna
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya user database mein save karna
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Congratulation! You are successfully registered." });

    } catch (err) {
        res.status(500).json({ message: "Error during registration", 
            error: err.message });
    }
});

// ==========================================
// 2. LOGIN ROUTE (User Entry Ke Liye)
// ==========================================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check user exist karta hai?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }

        // 2. Password sahi hai?
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        // 3. Token generate karna (Secret key: 'CHATGPT_SECRET')
        const token = jwt.sign(
            { id: user._id }, 
            "CHATGPT_SECRET", 
            { expiresIn: "7d" } // 7 din tak login rahega
        );

        // Password hata kar baki data bhejna
        res.status(200).json({
            message: "Login successful!",
            token,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ message: "Login mein error hai", error: err.message });
    }
});

export default router;