const express = require("express");
const router = express.Router();

const {infoController} = require("../../controllers");

router.get('/health', infoController.health);


module.exports = router;