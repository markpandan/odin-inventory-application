const express = require("express");
const router = express.Router();

const controller = require("../controllers/AdminController");
router.get("/new", controller.newGet);
router.post("/new", controller.newPost);

router.get("/update/:id", controller.updateGet);
router.post("/update/:id", controller.updatePost);

module.exports = router;
