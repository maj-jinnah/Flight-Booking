const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


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

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane
}