
const { FlightService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


const createFlight = async (req, res) => {
    try {
        const { flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats } = req.body;

        if (!flightNumber || !airplaneId || !departureAirportId || !arrivalAirportId || !arrivalTime || !departureTime || !price || !totalSeats) {
            throw new AppError('All fields are required', StatusCodes.BAD_REQUEST);
        }

        const flight = await FlightService.createFlight({ flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats });

        SuccessResponse.data = flight;
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

const getAllFlights = async (req, res) => {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
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
    createFlight,
    getAllFlights
}