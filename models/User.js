const { Schema, model } = require("mongoose");

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    timestamps: { type: Date },
});

module.exports = model("User", schema);
