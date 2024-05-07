const express = require("express");
const {
  register,
  login,
  farmer,
} = require("../controllers/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/farmer").post(farmer);

module.exports = router;
