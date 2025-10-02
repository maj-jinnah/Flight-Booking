const CrudRepository = require('./crud-repository');
const { Flight, Airport, Airplane } = require('../models');

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
}

module.exports = FlightRepository;