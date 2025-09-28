const router = require("express").Router();

const { CityController } = require("../../controllers");

router.post('/', CityController.createCity);
router.delete('/:id', CityController.deleteCity);
router.patch('/:id', CityController.updateCity);

module.exports = router;