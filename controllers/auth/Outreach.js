//////////////////////////////////
// DEPENDENCIES
/////////////////////////////////
const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/auth')

///////////////////////////////////////
// CREATE ROUTER
///////////////////////////////////////
const router = Router();

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

//SIGNUP PAGE
router.get('/signup', (req, res) => {
    res.render('auth/signup.jsx');
});

//CREATE NEW USER POST REQUEST
router.post('/signup', async (req, res) => {
    //Encrypt user password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    //Save new user in MongoDB
    const newUser = await User.create(req.body);
    //Redirect to login page
    res.redirect('/auth/login');
});

//LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('auth/login.jsx');
});

//LOGIN POST REQUEST
router.post('/login', async (req, res) => {
    //FIND USER
    const user = await User.find({username: req.body.username});
    //CHECK TO SEE IF USER WAS FOUND
    if(user.length > 0) {
        //COMPARE PASSWORD
        const check = await bcrypt.compare(req.body.password, user[0].password);
        if(check) {
            //SAVE INFO IN SESSION THAT USER IS LOGGED IN AND THEIR USERNAME
            req.session.login = true;
            req.session.username = user[0].username;
 ///////////////////I NEED TO GET THE ROUTE FOR THIS REDIRECT///////////////////
            res.redirect('/homepage')
        } else {
            //REDIRECT TO LOGIN PAGE IF FAILED TO LOGIN
            res.render('auth/fail.jsx');
        } 
    } else {
        //REDIRECT TO LOGIN PAGE IF FAILED ATTEMPT TO LOGIN
    }
})