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

    // Pagination defaults
    const limit = parseInt(query.limit) || 10;
    const offset = parseInt(query.offset) || 0;

    // Trips filter (departure-arrival)
    if (query.trips) {
        const [departure, arrival] = query.trips.split('-');

        // ✅ Validate both parts exist
        if (departure && arrival) {
            customFilter.departureAirportId = departure.trim().toUpperCase();
            customFilter.arrivalAirportId = arrival.trim().toUpperCase();
        }
    }

    // Price filter
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-');

        // ✅ Fixed: Check if values exist and are valid numbers
        const min = minPrice && !isNaN(minPrice) ? parseInt(minPrice) : 0;
        const max = maxPrice && !isNaN(maxPrice) ? parseInt(maxPrice) : 50000;

        // ✅ Validate min <= max
        if (min > max) {
            throw new AppError('Minimum price cannot be greater than maximum price', StatusCodes.BAD_REQUEST);
        }

        customFilter.price = { [Op.between]: [min, max] };
    }

    // Travelers filter (available seats)
    if (query.travelers) {
        const travelers = parseInt(query.travelers);

        // ✅ Validate positive number
        if (isNaN(travelers) || travelers < 1) {
            throw new AppError('Travelers must be a positive number', StatusCodes.BAD_REQUEST);
        }

        customFilter.totalSeats = { [Op.gte]: travelers };
    }

    // Trip date filter
    if (query.tripDate) {
        try {
            const date = new Date(query.tripDate);

            // ✅ Validate date is valid
            if (isNaN(date.getTime())) {
                throw new AppError('Invalid date format. Use YYYY-MM-DD', StatusCodes.BAD_REQUEST);
            }

            // ✅ Better date range - full day in UTC
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            customFilter.departureTime = { [Op.between]: [startOfDay, endOfDay] };
        } catch (error) {
            throw new AppError('Invalid date format. Use YYYY-MM-DD', StatusCodes.BAD_REQUEST);
        }
    }

    // Sort filter
    if (query.sort) {
        const sortFields = query.sort.split(',');

        // ✅ Whitelist allowed sort fields to prevent SQL injection
        const allowedSortFields = ['price', 'departureTime', 'arrivalTime', 'totalSeats', 'createdAt'];

        sortFields.forEach((field) => {
            const [key, order = 'ASC'] = field.split('_');

            // ✅ Validate sort field and order
            if (!allowedSortFields.includes(key)) {
                throw new AppError(`Invalid sort field: ${key}`, StatusCodes.BAD_REQUEST);
            }

            const sortOrder = order.toUpperCase();
            if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
                throw new AppError(`Invalid sort order: ${order}. Use ASC or DESC`, StatusCodes.BAD_REQUEST);
            }

            sortCriteria.push([key, sortOrder]);
        });
    } else {
        // ✅ Default sort by departure time
        sortCriteria.push(['departureTime', 'ASC']);
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortCriteria, limit, offset);

        // ✅ Return with pagination metadata
        return {
            data: flights,
            pagination: {
                limit,
                offset,
                total: flights.length
            }
        };
    } catch (error) {
        throw new AppError('Cannot fetch data of all Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
}