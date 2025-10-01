const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort, limit, offset) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            limit: limit,
            offset: offset
        });
        return response;
    }
}

module.exports = FlightRepository;