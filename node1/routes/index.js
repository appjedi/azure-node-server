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
router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Profile.findById(id);
  console.log(data);

  res.send(data);
});
router.post("/login", async (req, res) => {
  const data = { email: req.body.email, password: req.body.password }
  console.log("login", data);
  const users = await Profile.find({ email: data.email });
  console.log(users);
  if (users != null && users.length > 0 && users[0].password === data.password) {
    const user = { id: users[0]._id, lastName: users[0].lastName, firstName: users[0].lastName, email: users[0].email }
    ssn = req.session;
    ssn.user = user;
    res.send({ user: user, status: 1, message: "user authenticated" });
  } else {
    res.send({ status: -1, message: "user not authenticated" });
  }
})
router.get("/user", (req, res) => {
  ssn = req.session;
  console.log(ssn.user);
  res.send(ssn.user);
})

router.post("/post", (req, res) => {
  const data = req.body;
  console.log(data);
  Post.create(data);
  res.send({ status: 1, message: "Profile Created" });
});
router.get("/posts", async (req, res) => {
  const data = await Post.find({});
  console.log(data);

  res.send(data);
});
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Post.findById(id);
  console.log(data);

  res.send(data);
});
module.exports = router;
