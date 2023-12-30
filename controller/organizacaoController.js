const fs = require('fs');
const path = require('path');

const listarPastas = ((req, res) => {
    limpaPastaTemp();

    const folderPath = './json';
    const folders = fs.readdirSync(folderPath)
        .filter(file => fs.statSync(path.join(folderPath, file))
            .isDirectory());

    res.json(folders);
});

const listarArquivos = ((req, res) => {
    limpaPastaTemp();

    const folderName = req.params.folderName;
    const folderPath = `./json/${folderName}`;
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

    res.json(files);
});

function limpaPastaTemp() {
    const tempPath = `./setup/temp`;

    if (fs.readdirSync(tempPath).length !== 0) {
        fs.readdirSync(tempPath)
            .forEach(file => {
                fs.unlink(`${tempPath}/${file}`, function (err) {
                    if (err) {
                        console.error('Erro ao tentar excluir arquivos pasta temp.');
                        throw err;
                    }
                });
            });
        console.log('Excluiu arquivos pasta temp.')
    }
}


module.exports = {
    listarPastas,
    listarArquivos
}