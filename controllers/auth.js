const crypto = require("crypto");
const User = require("../models/User");
const Farmer = require("../models/Farmer");

const register = async(req, res, next) => {
    const {firstname, lastname, email, password, role} = req.body;

    if(!firstname) {
        res.status(400);
        return next(new Error("Please provide firstname"));
    }
    else if(!lastname) {
        res.staus(400);
        return next(new Error("Please provide lastname"));
    }
    else if(!email) {
        res.staus(400);
        return next(new Error("Please provide email"));
    }
    else if(!password) {
        res.status(400);
        return next(new Error("Please provide password"));
    }
    else if(!role) {
        res.send(400);
        return next(new Error("Please select role from dropdown"));
    }
    //checking weather user alreadt exists or not
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        return next(new Error("User already exists"));
    }

    try {
        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            role,
        });
        /*
        generateToken(user, 201, res);
        */
        console.log('received data for registration', req.body);

        res.json({message: 'Registration successfull'})
    } catch(error) {
        next(error);
    }
};

const login = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email) {
        res.status(400);
        return next(new Error("Please provide email"));
    }
    else if(!password) {
        res.status(400);
        return next(new Error("Please provide password"));
    }
    //check if user exists
    const user = await User.findOne({email}).select("+password");

    if(!user) {
        res.staus(400);
        return next(new Error("User does not exists"));
    }
    try {
        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            res.staus(400);
            return next(new Error("User password does not match"));
        }
        /*
        generateToken(user, 200, res);
        */
       res.send({message: "Login successfull"});
    } catch(error){
        next(error);
    }
}

//forgotpassword, resetpassword api code below

const farmer = async(req, res, next) => {
    const {nameoffarmer, mobilenumber, areaofpond, pondprepcost, waterprep, numofaerators, dateofstocking, numofseeds, density, sampling} = req.body;

    if(!nameoffarmer) {
        res.status(400);
        return next(new Error("Please provide name"));
    }
    else if(!mobilenumber) {
        res.staus(400);
        return next(new Error("Please provide contact number"));
    }
    else if(!areaofpond) {
        res.staus(400);
        return next(new Error("Please provide area of pond"));
    }
    else if(!pondprepcost) {
        res.status(400);
        return next(new Error("Please provide pond preparation cost"));
    }
    else if(!waterprep) {
        res.send(400);
        return next(new Error("Please provide the water preparation"));
    }
    else if(!numofaerators){
        res.send(400);
        return next(new Error("Please provide the number of aerators"));
    }
    else if(!dateofstocking){
        res.send(400);
        return next(new Error("Please provide the number date of stocking"));
    }
    else if(!numofseeds){
        res.send(400);
        return next(new Error("Please provide the number of seeds"));
    }
    else if(!density){
        res.send(400);
        return next(new Error("Please provide the density of pond"));
    }
    else if(!sampling){
        res.send(400);
        return next(new Error("Please provide the sampling of survival"));
    }
    try {
        const farmer = await Farmer.create({
            nameoffarmer,
            mobilenumber,
            areaofpond,
            pondprepcost,
            waterprep,
            numofaerators,
            dateofstocking,
            numofseeds,
            density,
            sampling,
        });
        /*
        generateToken(user, 201, res);
        */

        res.json({message: 'Registration successfull'})
    } catch(error) {
        next(error);
    }
};
module.exports = {
    register,
    login,
    farmer,
}
