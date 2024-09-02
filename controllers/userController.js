const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @desc Crete a new users
 * @route POST /users/register
 * @access public
 */

const createNewUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All the field is mandatory");
    }

    const userAvailable = await Users.findOne({email});
    if (userAvailable) {
        res.status(400)
        throw new Error("User is already registered");
    }

    // Hash Password
    const hashPasswords = await bcrypt.hash(password, 10);

    const user = await Users.create({
        username,
        email,
        password: hashPasswords
    });

    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

});

/**
 * @desc Login user
 * @route POST /users/login
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All the field is mandatory");
    }

    const user = await Users.findOne({email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        // res.json({message: user})
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "15m"
            }
        );
        res.status(200).json({ accessToken });

    } else {
        res.status(401)
        throw new Error("Email or Password not valid");
    }

    res.json({message: bcrypt.compare(password, user.password)})
});

/**
 * @desc Current user
 * @route GET /users/current
 * @access private
 */

const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user);
});


module.exports = {createNewUser, loginUser, currentUser};