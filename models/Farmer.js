const mongoose = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const farmerSchema = mongoose.Schema(
    {
        nameoffarmer: {
            type: String,
            required: [true, "Please provide full name of farmer"],
        },
        mobilenumber: {
            type: String,
            required: [true, "Please provide mobile number"],
        },
        areaofpond: {
            type: String,
            required: [true, "Please provide an area of pond"],
        }, 
        pondprepcost: {
            type: String,
            required: [true, "Please provide pond preparation cost"],
        },
        waterprep: {
            type: String,
            required: [true, "Please provide water preparation"],
        },
        numofaerators: {
            type: String,
            required: [true, "Please provide number of aerators"],
        },
        dateofstocking: {
            type: String,
            required: [true, "Please enter the date of stocking"],
        },
        numofseeds: {
            type: String,
            required: [true, "Please enter number of seeds"],
        },
        density: {
            type: String,
            required: [true, "Please provide density of pond"],
        },
        sampling: {
            type: String,
            required: [true, "Please provide sampling of survival"],
        },
    },
    {
        timestamps: true,
    }
);
farmerSchema.pre("save", async function (next) {
    next();
});
module.exports = mongoose.model("Farmer", farmerSchema);