const { AirportService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


const createAirport = async (req, res) => {
    try {
        const { name, code, address, cityId } = req.body;
        if (!name || !code || !cityId) {
            throw new AppError('Name, Code and CityId are required fields', StatusCodes.BAD_REQUEST);
        }
        const airport = await AirportService.createAirport({ name, code, address, cityId });

        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

const getAirports = async (req, res) => {
    try {
        const airports = await AirportService.getAirport();

        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

const getSingleAirport = async (req, res) => {
    try {
        const { id } = req.params;
        const airport = await AirportService.getSingleAirport(id);

        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
};

const deleteAirport = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await AirportService.deleteAirport(id);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getSingleAirport,
    deleteAirport,
}