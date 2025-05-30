const router = require("express").Router();

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");


router.post('/', AirplaneMiddleware.creatingAirplaneValidation, AirplaneController.createAirplane);


module.exports = router;