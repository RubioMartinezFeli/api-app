const { handleHttpError } = require("../helpers/handleError");
const { verifyToken, tokenSign } = require("../helpers/handleJwt");
const { usersModel } = require('../models')


const authMiddleware = async(req, res, next) => {
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res,"NO_TOKEN", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res,"ERROR:ID_TOKEN", 401);
            console.log(dataToken)
            return
        }

        const user = await usersModel.findById(dataToken._id);
        req.user = user

        next();

    } catch (e) {
        handleHttpError(res,"NO_SESION", 401);
    }
}

module.exports = authMiddleware;