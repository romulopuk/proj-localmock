const express = require('express');
const router = express.Router();

const { listarPastas, listarArquivos } = require('../controller/organizacaoController');
const {
    confirmaJsonExistente, evitarChamadaFavicon, buscarJsonTemporario
} = require('../controller/manipulacaoController');

router.get('/api/folders', listarPastas);
router.get('/api/files/:folderName', listarArquivos);

router.get('/api/json/:folderName/:fileName', confirmaJsonExistente);
router.get('/favicon.ico', evitarChamadaFavicon);
router.get('/:sourcePath', buscarJsonTemporario);


module.exports = router;