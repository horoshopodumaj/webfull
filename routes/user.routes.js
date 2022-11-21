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

module.exports = router;
