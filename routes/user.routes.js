const { Router } = require("express");
const router = Router();
const Users = require("../models/User");

// /api/users/
router.get("/", async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, try again" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await Users.findOneAndDelete({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
});

router.put("/blocked/:id", async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        user.isBlocked = true;
        user.isLogin = false;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "User blocking failed" });
    }
});

router.put("/unblocked/:id", async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        user.isBlocked = false;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "User unblocking failed" });
    }
});

router.put("/checked/:id", async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        user.isChecked = !user.isChecked;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "User checked/unchecked failed" });
    }
});

router.put("/uncheckedall/:checked", async (req, res) => {
    try {
        const user = await Users.updateMany({}, { isChecked: Boolean(+req.params.checked) });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "User checked/unchecked failed" });
    }
});

module.exports = router;
