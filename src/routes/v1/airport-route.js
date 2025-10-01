const router = require("express").Router();

const { AirportController } = require("../../controllers");

// localhost:3000/api/v1/airports

router.post('/', AirportController.createAirport);
router.get('/', AirportController.getAirports);
router.get('/:id', AirportController.getSingleAirport);
router.delete('/:id', AirportController.deleteAirport);

module.exports = router;