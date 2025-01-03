const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.route("/login").post(AuthController.login);
router.route("/signup").post(AuthController.createUser);

module.exports = router;
