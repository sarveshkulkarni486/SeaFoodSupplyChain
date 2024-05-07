const mongoose = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please provide firstname"],
        },
        lastname: {
            type: String,
            required: [true, "Please provide lastname"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        }, 
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false,
        },
        role: {
            type: String,
            required: [true, "Please provide a role"],
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    const encryptpass = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, encryptpass);
    next();
});

userSchema.methods.matchPasswords = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.getSignedToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

/*
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 60 * (60 * 1000);
    return resetToken;
};
*/
module.exports = mongoose.model("User", userSchema);