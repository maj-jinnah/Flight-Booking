const health = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is healthy",
        error: {},
        data: {},
    })
}

module.exports = {
    health
};