const userService = require("../services/user_service");

const jwtProvider = require("../config/jwtProvider");
const User = require("../models/user_model");
const bcrypt = require('bcrypt');

const cartService = require("../services/cart_service");

const register = async(req,res) => {
    try {

        const user = await userService.createUser(req.body);
        
        const jwt = jwtProvider.generateToken(user._id);

        // creating the cart after successful registration becasue after the registration this is the only way to create cart
        await cartService.createCart(user._id);

        return res.status(200).send({jwt, message:"Successfully Registration"})
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const login = async(req,res) => {

    const {password, email} = req.body;
    try {

        const user = await userService.findUserByEmail(email);

        if(!user){
            return res.status(404).send({message:"User not found with email",email});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).send({message:"Invalid Password...."})
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt, message:"Successful Login"});
        
    } catch (error) {
        
    }
}

module.exports = {register, login}