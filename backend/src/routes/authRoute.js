const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/controllers.js");
const { authMiddleware } = require("../middlewares/middlewares.js");

/**
 * route to login user
 * POST /auth/login
 */
router.post("/login", authController.loginUser);

/**
 * route to logout user
 * POST /auth/logout
 */
router.post("/logout", [authMiddleware.verifyToken] , authController.logoutUser);

/**
 * validate if token is ok (middleware take cares of validation)
 * POST /auth/validate
 */
router.post("/validate", [authMiddleware.verifyToken] , authController.validateToken);

module.exports = router;