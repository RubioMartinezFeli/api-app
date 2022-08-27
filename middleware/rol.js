const { handleHttpError } = require("../helpers/handleError");
const users = require("../models/nosql/users");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req;
        console.log({user});
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle))
        if(!checkValueRol){ 
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
            return
        }
        next();     
    } catch (e) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
        return
    }
}

module.exports = checkRol;