const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

// RETURN ALL USERS
router.get("/usersList", async (req, res) => {
  try {
    const user = await User.find(req.user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// ADD A NEW USER TO THE DATABASE
router.post("/add", async (req, res) => {
  try {
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// EDIT A USER BY ID
router.put("/:id", async (req, res) => {
  const name =
    typeof req.body.name === "string" && req.body.name.length > 0
      ? req.body.name
      : false;
  const email =
    typeof req.body.email === "string" &&
    String(req.body.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? req.body.email
      : false;
  const password =
    typeof req.body.password === "string" && req.body.password.length >= 6
      ? req.body.password
      : false;

  console.log(name, email, password);

  if (!name && !email && !password) {
    // If fields are missing or invalid, return bad request with error message
    return res
      .status(400)
      .json({ msg: "Missing field(s) to update or field(s) are in valid" });
  }

  try {
    // Check if the user exists
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Make sure that the user updates his own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // Create the updated user object
    const updatedUser = {};

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    // Find and update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
// REMOVE A USER BY ID
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router;
