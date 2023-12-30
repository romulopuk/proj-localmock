const fs = require('fs');
const path = require('path');

const { criaMockJsonExistente, chamaMockJsonParaBackend } = require('../services/jsonService');



const confirmaJsonExistente = ((req, res) => {
    res.json(criaMockJsonExistente(req));
});


const buscarJsonTemporario = ((req, res) => {
    res.status(chamaMockJsonParaBackend(req).statusCode)
        .json(chamaMockJsonParaBackend(req).statusResponse);
});



module.exports = {
    confirmaJsonExistente,
    buscarJsonTemporario
}