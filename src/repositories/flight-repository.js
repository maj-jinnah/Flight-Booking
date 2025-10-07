const CrudRepository = require('./crud-repository');
const { Flight, Airport, Airplane } = require('../models');
const {AppError} = require('../utils/errors');
const {sequelize} = require('../models');
const { StatusCodes } = require('http-status-codes');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    // async getAllFlights(filter, sort, limit, offset) {
    //     const response = await Flight.findAll({
    //         where: filter,
    //         order: sort,
    //         limit: limit,
    //         offset: offset
    //     });
    //     return response;
    // }

    async getAllFlights(filter, sort, limit, offset) {
        try {
            // ✅ Get total count for pagination
            const totalCount = await Flight.count({ where: filter });

            const flights = await Flight.findAll({
                where: filter,
                order: sort.length > 0 ? sort : [['departureTime', 'ASC']],
                limit: limit,
                offset: offset,
                // ✅ Include related data for better responses
                include: [
                    {
                        model: Airport,
                        as: 'departureAirport',
                        attributes: ['code', 'name', 'cityId']
                    },
                    {
                        model: Airport,
                        as: 'arrivalAirport',
                        attributes: ['code', 'name', 'cityId']
                    },
                    {
                        model: Airplane,
                        attributes: ['modelNumber', 'capacity']
                    }
                ],
                // ✅ Exclude sensitive data
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            return {
                flights,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: Math.floor(offset / limit) + 1
            };
        } catch (error) {
            console.error('Repository error:', error);
            throw error;
        }
    }

    // async updateRemainingSeats(flightId, seats, dec = true) {

    //     if (dec) {
    //         const response = await Flight.decrement('totalSeats', {by: seats, where: { id: flightId }}
    //         );
    //         return response;
    //     } else {
    //         const response = await Flight.increment(
    //             'totalSeats',
    //             { by: seats, where: { id: flightId } }
    //         );
    //         return response;
    //     }
    // }

    async updateRemainingSeats(flightId, seats, dec = true, transaction = null) {
    const t = transaction || await sequelize.transaction();
    
    try {
        if (!flightId || !seats || seats < 0) {
            throw new AppError('Invalid input parameters', StatusCodes.BAD_REQUEST);
        }

        const flight = await Flight.findByPk(flightId, { 
            transaction: t,
            lock: true // Row-level lock to prevent concurrent modifications
        });
        
        if (!flight) {
            throw new AppError('The flight you requested is not found', StatusCodes.NOT_FOUND);
        }
        
        if (dec && flight.totalSeats < seats) {
            throw new AppError(
                `Insufficient seats. Available: ${flight.totalSeats}, Requested: ${seats}`,
                StatusCodes.BAD_REQUEST
            );
        }
        
        if (!dec && flight.totalSeats + seats > flight.airplane.capacity) {
            throw new AppError(
                `Exceeds maximum capacity. Available: ${flight.airplane.capacity - flight.totalSeats}, Requested: ${seats}`,
                StatusCodes.BAD_REQUEST
            );
        }

        const method = dec ? 'decrement' : 'increment';
        await Flight[method]('totalSeats', {
            by: seats,
            where: { id: flightId },
            transaction: t
        });

        if (!transaction) {
            await t.commit();
        }
        
        return await Flight.findByPk(flightId, { transaction: t });
        
    } catch (error) {
        if (!transaction) {
            await t.rollback();
        }
        throw error;
    }
}

    
}

module.exports = FlightRepository;