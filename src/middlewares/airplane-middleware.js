const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const creatingAirplaneValidation = (req, res, next) => {
    const { modelNumber, capacity } = req.body;
    if (!modelNumber || !capacity) {
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['Model number and capacity are required'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    creatingAirplaneValidation
}