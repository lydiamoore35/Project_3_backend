//BC: Current website


////////////////
//Dependencies
///////////////
require('dotenv').config();
const User = require('../../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const router = Router();
const {SECRET} = process.env;

////////////
//Sign Up
///////////
router.post('/signup', async (req,res) => {
    try {
        //Salt the user's password so it is encrypted 
        req.body.password = await bcrypt.hash(req.body.password, 10);
        //Create the new user
        const newUser = await User.create(req.body);
        //If everything goes well we get a new user. If not 400 error
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({error});
    }
});


////////////
//Log In: 
///////////
router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                //Token assigned to the username
                const token = await jwt.sign({username}, SECRET);
                res.status(200).json({token});
            } else {
                res.status(400).json({error: "Password does not match."})
            }
        } else {
            res.status(400).json({error: "User not found."})
        }
    } catch(error){
        res.status(400).json({error})
    }
})

module.exports = router;


