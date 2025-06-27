const express = require("express");
const router = express.Router();

const controller = require("../controllers/AnimePageController");
router.get("/:id", controller.get);

module.exports = router;
