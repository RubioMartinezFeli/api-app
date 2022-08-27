const uploadMiddleware = require('../helpers/handleStorage')
const express = require('express');
const router = express.Router();
const {getItems, getItem, deleteItem, createItem } = require('../controllers/storage')
const {validatorGetItem} = require('../validators/storage')

/**
 * Listar los items
 */
router.get("/", getItems);

/**
 * Obtener un detalle item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Eliminar un registro
 */
router.delete("/:id", validatorGetItem, deleteItem)

/**
 * Crear un registro
 */
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router;