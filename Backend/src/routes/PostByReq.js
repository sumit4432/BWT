const express = require("express");
const { createPostByRequirements } = require("../controller/postByRequirments");
const router = express.Router();
router.route("/postByRequirment").post(createPostByRequirements);
module.exports = router;
