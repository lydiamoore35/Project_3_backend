const Outreach = require("../models/outreach");
const { Router } = require("express");
const router = Router();

//index route
router.get("/", async (req, res) => {
  res.json(await Outreach.find({}));
});

//create route

//update route
router.put("/:id", async (req, res) => {
  res.json(await Outreach.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route
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
