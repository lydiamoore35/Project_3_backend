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
//Sign Up BC: localhost:4500/signup 
///////////
router.post('/signup', async (req,res) => {
    console.log('Welcome to the signup page')
    try {
        //Salt the user's password so it is encrypted 
        req.body.password = await bcrypt.hash(req.body.password, 10);
        //Create the new user
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
        //Redirect the User to the login page
    } catch (error) {
        res.status(400).json({error});
        res.redirect('/signup')
    }
    res.redirect("/login")
});


////////////
//Log In: BC: localhost:4500/login
///////////
router.post('/login', async (req, res) => {
    console.log('Hello from Log in page')
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                //Token assigned to the username
                const token = await jwt.sign({username, zipCode}, SECRET);
                res.status(200).json({token});
            } else {
                res.status(400).json({error: "Password does not match."})
            }
        } else {
            res.status(400).json({error: "User not found."})
        }
    } catch(error){
        res.status(400).json({error})
        res.redirect('/login')
    }
     //Redirect the User to their homepage
     res.redirect('/auth/userHomepage')
})

module.exports = router;


