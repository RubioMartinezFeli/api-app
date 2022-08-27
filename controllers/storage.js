const fs = require('fs');
const {storageModel} = require("../models");
const {handleHttpError} = require('../helpers/handleError');
const { matchedData } = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos!
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req, res) => {
    
    try {
        const data = await storageModel.find({});
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async(req, res) => {

    try {
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }

}

/**
 * Instertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async(req, res) => {
    try {
        const {body, file} = req
        console.log(file)
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEMS")
    }
}

/**
 * Eliminar un registro
 * @param {} req 
 * @param {*} res 
 */
const deleteItem = async(req, res) => {
    try {
        const {id} = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id})
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`

        // fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }

        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem
}