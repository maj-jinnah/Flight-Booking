const express = require("express");
const router = express.Router();

const {InfoController} = require("../../controllers");

const airplaneRoutes = require("./airplane-route");
const cityRoutes = require("./city-route");
const airportRoutes = require("./airport-route");

// localhost:3000/api/v1

router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);

router.get('/health', InfoController.health);



module.exports = router;