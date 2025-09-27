const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


const createAirplane = async (req, res) => {
    try {
        const { modelNumber, capacity } = req.body;
        const airplane = await AirplaneService.createAirplane({ modelNumber, capacity });

        SuccessResponse.data = airplane;
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

const getAirplanes = async (req, res) => {
    try {
        const airplanes = await AirplaneService.getAirplanes();

        SuccessResponse.data = airplanes;
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

const getSingleAirplane = async (req, res) => {
    try {
        const { id } = req.params;
        const airplane = await AirplaneService.getSingleAirplane(id);

        SuccessResponse.data = airplane;
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

const deleteAirplane = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await AirplaneService.deleteAirplane(id);
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

const updateAirplane = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelNumber, capacity } = req.body;
        if(!modelNumber && !capacity){
            throw new AppError('No data found to update', StatusCodes.BAD_REQUEST);
        }

        const response = await AirplaneService.updateAirplane(id, { modelNumber, capacity });
        
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
    createAirplane,
    getAirplanes,
    getSingleAirplane,
    deleteAirplane,
    updateAirplane
}