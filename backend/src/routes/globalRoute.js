const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to To Do List Backend by Pedro Carmo");
});

module.exports = router;