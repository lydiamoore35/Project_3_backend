const Outreach = require("../models/outreach");
const { Router } = require("express");
const router = Router();

//index route
router.get("/", async (req, res) => {
  res.json(await Outreach.find({}));
});

//create route
router.post("/", async (req, res) => {
  res.json(await Outreach.create(req.body));
});

//update route
router.put("/:id", async (req, res) => {
  res.json(await Outreach.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await Outreach.findByIdAndRemove(req.params.id));
});

// EXPORT ROUTER
module.exports = router;
