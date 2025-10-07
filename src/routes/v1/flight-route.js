const router = require('express').Router();

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

router.post('/', FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlight);
router.patch('/:id', FlightMiddlewares.validateUpdateSeatsRequest, FlightController.updateSeats);

module.exports = router;