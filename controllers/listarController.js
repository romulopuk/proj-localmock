const { listarPastasService, listarArquivosService } = require('../services/listarService.js');

const buscarPastas = ((req, res) => {
    res.json(listarPastasService(req));
});

const buscarArquivos = ((req, res) => {
    res.json(listarArquivosService(req));
});



module.exports = {
    buscarPastas,
    buscarArquivos
}