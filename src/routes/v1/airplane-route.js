const router = require("express").Router();

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");

// localhost:3000/api/v1/airplanes

router.post('/', AirplaneMiddleware.creatingAirplaneValidation, AirplaneController.createAirplane);
router.get('/', AirplaneController.getAirplanes);
router.get('/:id', AirplaneController.getSingleAirplane);
router.delete('/:id', AirplaneController.deleteAirplane);
router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;