const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const router = express.Router();
const { validatorLogin, validatorRegister } = require('../validators/auth')


/**
 * Crear un registro
 */

//Todo http://localhost:3001/api/auth/login

router.post("/login", validatorLogin, loginCtrl)

//Todo http://localhost:3001/api/auth/register

router.post("/register", validatorRegister, registerCtrl);


module.exports = router