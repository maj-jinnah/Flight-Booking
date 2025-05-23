 const {StatusCodes} = require("http-status-codes");

const health = (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Server is healthy",
        error: {},
        data: {},
    })
}

module.exports = {
    health
};