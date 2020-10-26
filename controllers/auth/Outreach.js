//I NEED TO COMPARE THE ROUTES I HAVE HERE TO WHAT OUR ACTUAL ROUTES ARE TO MAKE SURE THEY WORK PROPERLY

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
    //Find user
    const user = await User.find({username: req.body.username});
    //Check to see if user was found
    if(user.length > 0) {
        //Compare password
        const check = await bcrypt.compare(req.body.password, user[0].password);
        if(check) {
            //Save info that the user is logged in and their username
            req.session.login = true;
            req.session.username = user[0].username;
 ///////////////////I NEED TO GET THE ROUTE FOR THIS REDIRECT///////////////////
            res.redirect('/homepage')
        } else {
            //Redirect to login page if attempt failed
            res.render('auth/fail.jsx');
        } 
    } else {
        //Redirect to login page if attempt failed
        res.render('auth/fail.jsx')
    }
})

//LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy();
///////I NEED THE CORRECT ROUTE FOR THIS////////////////////////////    
    res.redirect('/')
})

///////////////////////////////////////
// Export Router
///////////////////////////////////////
module.exports = router;


