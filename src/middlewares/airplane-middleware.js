const { StatusCodes } = require('http-status-codes');

const creatingAirplaneValidation = (req, res, next) => {
    const { modelNumber, capacity } = req.body;
    if (!modelNumber || !capacity) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                success: false,
                message: "Something went wrong while creating airplane",
                data: {},
                error: { explanation: "Model number and capacity are required" }
            })
    }
    next();
}

module.exports = {
    creatingAirplaneValidation
}