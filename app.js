require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morganBody = require('morgan-body')
const dbConnect = require('./config/mongo');
const loggerStream = require("./helpers/handleLogger");


const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("storage"))

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400
    }
});

const port = process.env.PORT || 3000;

/**
 * Aqui invocamos a las rutas
 */

// Al no poner nada se toma el archivo index.js
app.use("/api", require("./routes"))


app.listen(port, () => {
    console.log(`Tu app esta lista por http://localhost:${port}`)
})

dbConnect();