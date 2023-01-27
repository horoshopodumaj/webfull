const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "The minimum password length is 1 character").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data during registration",
                });
            }

            const { email, password, name, createDate, loginDate, isBlocked, isChecked, isLogin } =
                req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "A user with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name,
                createDate,
                loginDate,
                isBlocked,
                isChecked,
                isLogin,
            });

            await user.save();

            res.status(201).json({
                message: "The user has been created, click the 'Sign in' button",
            });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Enter the correct email").isEmail(),
        check("password", "Enter the password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data when logging in",
                });
            }

            const { email, password, loginDate, isLogin, isBlocked } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "The user is not found, register" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password, try again" });
            }

            const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
                expiresIn: "1h",
            });

            await User.findOneAndUpdate({ email }, { loginDate, isLogin: true, isBlocked: false });

            res.json({ token, userId: user.id, isLogin: true });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    }
);
// /api/auth/islogin
router.put("/islogin/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            await User.updateMany({}, { isChecked: false });
            return res.json({
                message: "The user is not found, register",
                isLogin: false,
            });
        }

        if (!user.isLogin) {
            await User.updateMany({}, { isChecked: false });
            return res.json({ message: "Log in again", isLogin: user.isLogin });
        }

        res.json({ isLogin: user.isLogin });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, try again" });
    }
});

module.exports = router;
