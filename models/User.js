const { Schema, model } = require("mongoose");

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createDate: { type: Date },
    loginDate: { type: Date },
    isBlocked: false,
    isChecked: false,
    isLogin: { type: Boolean, default: true },
});

module.exports = model("User", schema);
