const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes')

const createAirplane = async (req, res) => {
    try {
        const { modelNumber, capacity } = req.body;
        const airplane = await AirplaneService.createAirplane({ modelNumber, capacity });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: "Airplane created successfully",
                data: airplane,
                error: {}
            })
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: "Something went wrong while creating airplane", 
                data: {},
                error: error
            })
    }
}

module.exports = {
    createAirplane
}