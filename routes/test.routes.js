var express = require("express");
var router = express.Router();
const test = require("../controllers/test.controller.js");

// Create a new Tutorial
router.post("/register", test.create);

// Retrieve all published Tutorials
router.get("/:id", test.findOne);

// Update a Tutorial with id
router.delete("/:uuid", test.delete);

module.exports = router;
