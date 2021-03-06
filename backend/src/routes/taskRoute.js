const express = require("express");
const router = express.Router();

const { taskController } = require("../controllers/controllers.js");
const { authMiddleware } = require("../middlewares/middlewares.js");


/**
 * route to create task
 * POST /tasks
 */
router.post("/", [authMiddleware.verifyToken] , taskController.createTask);
/**
 * route to get all task
 * POST /tasks
 */
router.get("/", [authMiddleware.verifyToken] , taskController.findUserTasks);

/**
 * route to get task
 * POST /tasks
 */
router.get("/:id", [authMiddleware.verifyToken] , taskController.findUserTaskById);
/**
 * route to update task
 * PUT /tasks
 */
router.put("/:id", [authMiddleware.verifyToken] , taskController.updateUserTask);
/**
 * route to delete task
 * POST /tasks
 */
router.delete("/:id", [authMiddleware.verifyToken] , taskController.deleteUserTask);

module.exports = router;