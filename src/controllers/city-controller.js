const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const createCity = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new AppError(['City name not found in the request'], StatusCodes.BAD_REQUEST);
        }
        const response = await CityService.createCity({ name });
        SuccessResponse.data = response;
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

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await CityService.deleteCity(id);
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

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            throw new AppError(['City name not found in the request'], StatusCodes.BAD_REQUEST);
        }
        const response = await CityService.updateCity(id, { name });
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
    createCity,
    deleteCity,
    updateCity
}