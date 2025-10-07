const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

const validateUpdateSeatsRequest = (req, res, next) => {
    if(!req.body.seats){
        ErrorResponse.message = 'Something went wrong while updating the flight seats';
        ErrorResponse.error = new AppError(['Number of seats to update is required'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateUpdateSeatsRequest
}