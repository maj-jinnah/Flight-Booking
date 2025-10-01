const router = require('express').Router();

const { FlightController } = require('../../controllers');

router.post('/', FlightController.createFlight);
router.get('/', FlightController.getAllFlights);

module.exports = router;