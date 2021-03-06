const express = require("express");
const router = express.Router();

const { registerController } = require("../controllers/controllers.js");

/**
 * route to register user
 * POST /register
 */
router.post("/", registerController.registerUser);

module.exports = router;