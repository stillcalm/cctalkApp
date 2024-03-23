var express = require('express');
var router = express.Router();
const user = require("../controllers/users.controller");

router.post("/login", user.login);
/* GET users listing. */
router.post("/register", user.create);

// Retrieve all published Tutorials
router.get("/:uuid", user.findOne);

// Update a Tutorial with id
router.delete("/:uuid", user.delete);

router.get("/userinfo/:uuid", user.getUserInfo);

router.post("/update/:uuid", user.updateUserInfo);

module.exports = router;
