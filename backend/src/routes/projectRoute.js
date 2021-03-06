const express = require("express");
const router = express.Router();

const { projectController } = require("../controllers/controllers.js");
const { authMiddleware } = require("../middlewares/middlewares.js");


/**
 * route to create project
 * POST /projects
 */
router.post("/", [authMiddleware.verifyToken] , projectController.createProject);
/**
 * route to get all project
 * POST /projects
 */
router.get("/", [authMiddleware.verifyToken] , projectController.findUserProjects);

/**
 * route to get project
 * POST /projects
 */
router.get("/:id", [authMiddleware.verifyToken] , projectController.findUserProjectById);
/**
 * route to update project
 * PUT /projects
 */
router.put("/:id", [authMiddleware.verifyToken] , projectController.updateUserProject);
/**
 * route to delete project
 * POST /projects
 */
router.delete("/:id", [authMiddleware.verifyToken] , projectController.deleteUserProject);

module.exports = router;