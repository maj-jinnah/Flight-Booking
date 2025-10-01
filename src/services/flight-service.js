const { FlightRepository } = require("../repositories")
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository()

const createFlight = async (data) => {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAllFlights = async (query) => {

    const customFilter = {};
    const sortCriteria = [];

    if (query.trips) {
        const [departure, arrival] = query.trips.split('-');
        customFilter.departureAirportId = departure;
        customFilter.arrivalAirportId = arrival;
    }

    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = { [Op.between]: [minPrice === undefined ? 0 : minPrice, maxPrice === undefined ? 50000 : maxPrice] };
    }

    if (query.travelers) {
        customFilter.totalSeats = { [Op.gte]: query.travelers };
    }

    if (query.tripDate) {
        const date = new Date(query.tripDate);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        customFilter.departureTime = { [Op.between]: [date, nextDate] };
    }

    if (query.sort) {
        const sortFields = query.sort.split(',');

        sortFields.forEach((field) => {
            const [key, order] = field.split('_');
            sortCriteria.push([key, order]);
        });
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortCriteria);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
}