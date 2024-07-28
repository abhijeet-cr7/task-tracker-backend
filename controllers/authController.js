const express = require('express');
const User = require("../modal/userSchema");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req, res) => {
    console.log(req.body, "req")
    try{
        const {username, email, password} = req.body;
        console.log(username, email, password, "credentials")
        const hashedPassword = await brcypt.hash(password, 10);
        const roleToSet = email !== "abhijeetdbz7@gmail.com" ? "user" : "admin";
        const findUser = await User.findOne({name : username});
        console.log(findUser, "findUser")
        if(findUser!== null && findUser?.name === username){
            res.status(409).json({"message" : "User already exists"});
        }
        console.log("reached")
        const user = new User({name : username ,email : email, password : hashedPassword, role : roleToSet});
        console.log(user, "user")
        await user.save().then((savedUser) => {
            console.log(`User got saved ${savedUser}`)
        }).catch((err) => {
            console.log(`There was an error saving the user ${err}`)
        });
        res.status(201).json({message : 'User registered successfully'});
    }
    catch(err){
        res.status(500).json({error : err});
    }
}

exports.loginUser = async(req, res) => {
    try{
        const {username, password, email} = req.body;
        const user = await User.findOne({name : username});
        if(!user){
            res.send(401).json({message : "Unauthorized"});
        }
        const passwordMatch = await brcypt.compare(password, user.password);
        if(!passwordMatch){
            res.send(401).json({message : "Unauthorized"});
        }
        const jwtToken = jwt.sign({userId : user._id}, 'your-secret-key', {
            expiresIn : '1h'
        })
        res.status(200).json({jwtToken});
    }
    catch(err){
        res.status(500).json({error : `Login failed ${err}`})
    }
}
