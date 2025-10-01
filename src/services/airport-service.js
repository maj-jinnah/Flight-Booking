const { AirportRepository } = require("../repositories")
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
 
const airportRepository = new AirportRepository()

const createAirport = async (data) => {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirport = async () => {
    try {
        const airports = await airportRepository.findAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getSingleAirport = async (airportId) => {
    try {
        const airport = await airportRepository.findOne(airportId);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const deleteAirport = async (airportId) => {
    try {
        const response = await airportRepository.delete(airportId);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not found', error.statusCode);
        }
        throw new AppError('Cannot delete the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateAirport = async (airportId, data) => {
    try {
        const response = await airportRepository.update(airportId, data);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not found', error.statusCode);
        }
        throw new AppError('Cannot update the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getSingleAirport,
    deleteAirport,
    updateAirport,
}