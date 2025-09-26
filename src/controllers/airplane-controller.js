const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


const createAirplane = async (req, res) => {
    try {
        const { modelNumber, capacity } = req.body;
        const airplane = await AirplaneService.createAirplane({ modelNumber, capacity });

        SuccessResponse.message = "Airplane created successfully";
        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

const getAirplanes = async (req, res) => {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.message = "Airplanes fetched successfully";
        SuccessResponse.data = airplanes;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching airplanes";
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

const getSingleAirplane = async (req, res) => {
    try {
        const { id } = req.params;
        const airplane = await AirplaneService.getSingleAirplane(id);
        SuccessResponse.message = "Single Airplane fetched successfully";
        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching airplane";
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane
}