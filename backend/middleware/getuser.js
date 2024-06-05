var jwt = require('jsonwebtoken')
var constants = require('../utilities/constants')

const getUser = async (request, response, next) => {
    try {
        var token = request.header('jwt-token');
        if (!token) {
            return response.status(401).json({ error: "Please authenticate using correct JWT!" });
        }
        var data = jwt.verify(token, constants.JWT_SECRET);
        request.user = data.user;
        next();
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
        return response.status(401).json({error: "Please authenticate using correct JWT!"});
    }
}

module.exports = getUser;