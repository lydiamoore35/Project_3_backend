const Outreach =  require("../models/Outreach.js")
const User = require("../models/auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const auth = require('../authMiddleware/authMiddleware')
const authRouter = require('./auth/Outreach')
const {SECRET} = process.env;

// BC: Backend Routes: localhost4500
// BC: Frontend Routes: localhost:3000


//index route: BC: localhost:4500   (JSON Data)
router.get("/", async (req, res) => {
  console.log('Hello Site Landing Page')
  res.json(await Outreach.find({}));
});


///////////////3///
// BC: User Homepage BC: localhost:4500/auth/userHomepage - Blocked by auth
//////////////////

router.get('/auth/userHomepage', auth,  async (req, res) => {
  try {
    console.log('Hello from User Homepage. You need to be logged in')
    res.json(await Outreach.find({}))
  } catch(error){
    console.log(error)
  }
  
})

/////////////
//BC: Signup localhost:4500/signup
/////////////
router.post('/signup', async (req,res) => {
  console.log('Welcome to the signup page')
  //res.send('Hello from sign up page')
  try {
      //Salt the user's password so it is encrypted 
      req.body.password = await bcrypt.hash(req.body.password, 10);
      //Create the new user
      const newUser = await User.create(req.body);
      //If everything goes well we get a new user. If not 400 error
      res.status(200).json(newUser);
      //Redirect the User to the login page
      res.redirect("/login")
  } catch (error) {
      res.status(400).json({error});
  }
});


////////////
//Log In: BC: localhost:4500/login
///////////
router.post('/login', async (req, res) => {
  console.log('Hello from Log in page')
  //res.send('Hello from login page')
  try{
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if(user){
          const match = await bcrypt.compare(password, user.password);
          if(match) {
              //Token assigned to the username
              const token = await jwt.sign({username , zipCode}, SECRET);
              res.status(200).json({token});
              //Redirect the User to their homepage
              res.redirect('/auth/userHomepage')
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



//create route: Requires User Login
router.post("/", async (req, res) => {
  res.json(await Outreach.create(req.body));
});


//update route: Requires User Login
router.put("/:id", async (req, res) => {
  res.json(await Outreach.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route: Requires User Login
router.delete("/:id", async (req, res) => {
  res.json(await Outreach.findByIdAndRemove(req.params.id));
});

//Profile populate by zip code
// router.get("/profile/:zipCode" , auth, async (req, res) => {
//   try{
//     req.body.username = req.session.username
//     zipCode = req.params.zipCode
//     const outreach = await Outreach.find({zipCode: req.params.zipCode})
//     res.render("profile/profilePage.jsx",{outreach})//or whatever we deccide to call it 
//   }  catch(error){
//     console.log(error)
//   }

// });


// EXPORT ROUTER
module.exports = router;
