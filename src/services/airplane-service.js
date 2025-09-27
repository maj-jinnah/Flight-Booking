const { AirplaneRepository } = require("../repositories")
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository()

const createAirplane = async (data) => {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirplanes = async () => {
    try {
        const airplanes = await airplaneRepository.findAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getSingleAirplane = async (airplaneId) => {
    try {
        const airplane = await airplaneRepository.findOne(airplaneId);
        return airplane;
    } catch (error) {

        console.log('error --- ', error);
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane
}