var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const MongoURL = "mongodb+srv://appuser:AppData2022@cluster0.aga82.mongodb.net/tombook";
mongoose.connect(MongoURL);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("<h1>Hello from Azure</h1>");
});
router.get("/profiles", async (req, res) => {
  const data = await Profile.find({});
  console.log(data);

  res.send(data);
});
router.post("/profile", (req, res) => {
  const data = req.body;
  console.log(data);
  Profile.create(data);
  res.send({ status: 1, message: "Profile Created" });
})
module.exports = router;
