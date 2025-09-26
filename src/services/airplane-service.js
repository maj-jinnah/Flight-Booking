const { AirplaneRepository } = require("../repositories")

const airplaneRepository = new AirplaneRepository()

const createAirplane = async (data) => {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

const getAirplanes = async () => {
    try {
        const airplanes = await airplaneRepository.findAll();
        return airplanes;
    } catch (error) {
        throw error;
    }
}

const getSingleAirplane = async (airplaneId) => {
    try {
        const airplane = await airplaneRepository.findOne(airplaneId);
        // if(!airplane){
        //     throw {error: "Airplane not found"};
        // }
        return airplane;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane
}