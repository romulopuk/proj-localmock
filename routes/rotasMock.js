const express = require('express');
const router = express.Router();

const { evitarChamadaFavicon } = require('../controllers/faviconController');
const { buscarPastas, buscarArquivos } = require('../controllers/listarController');
const { confirmaJsonExistente, buscarJsonTemporario } = require('../controllers/jsonController');

router.get('/api/folders', buscarPastas);
router.get('/api/files/:folderName', buscarArquivos);

router.get('/api/json/:folderName/:fileName', confirmaJsonExistente);
router.get('/favicon.ico', evitarChamadaFavicon);
router.get('/:sourcePath', buscarJsonTemporario);


module.exports = router;