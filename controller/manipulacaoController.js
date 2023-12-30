const fs = require('fs');
const path = require('path');

const confirmaJsonExistente = ((req, res) => {
    const folderName = req.params.folderName;
    const fileName = req.params.fileName;
    const filePath = `../json/${folderName}/${fileName}`;

    try {
        const jsonData = require(filePath);
        res.json(jsonData);

        criaMockJson(folderName, fileName);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
    }
});


const evitarChamadaFavicon = ((req, res) => {
    console.log('Chamada favicon');
    res.status(204);
    res.end();
});


const buscarJsonTemporario = ((req, res) => {
    const sourcePath = req.params.sourcePath;
    const tempPath = './setup/temp';

    const folders = fs.readdirSync('./json')
        .filter(file => fs.statSync(path.join('./json', file))
            .isDirectory());

    console.log('::: Entrada do busca temp ::: ', new Date());
    console.log(`Pasta origem: ${sourcePath}`);

    if (folders.includes(sourcePath)) {
        try {
            const jsonData = JSON.parse(fs.readFileSync(`${tempPath}/mock.json`, 'utf8'));
            console.log(`::: Informação do JSON Temporário ::: ${jsonData}`);

            if (`/${sourcePath}` === jsonData.folder.endpoint) {
                console.log('Endpoint é igual ao endpoint');
                console.log('::: Saida do busca temp ::: ', new Date());

                res.status(jsonData.statusInfo.statusCode)
                    .json(jsonData.statusInfo.statusResponse);

            } else {
                console.error('Endpoint não bateu com Json: ' + jsonData.folder.endpoint);
                res.status(404);
            }

        } catch (error) {
            console.error('Não foi possível encontrar o endpoint', error);
            res.status(404);
        }

    } else {
        console.log('Endpoint é inválido.');
        res.status(500);
    }
});

function criaMockJson(sourceFolder, sourceFile) {
    const tempoEntrada = new Date();
    console.log('::: Entrada Endpoint criação de json temp ::: ', tempoEntrada)

    const tempPath = `./setup/temp`;
    const filePath = `../json/${sourceFolder}/${sourceFile}`;

    console.log('Criar Temp filePath ::: ' + filePath);
    console.log(`::: Endpoint criação temporário: ${sourceFolder}, ${sourceFile}`);

    try {
        const jsonData = require(filePath);
        const jsonString = JSON.stringify(jsonData, null, 2);
        console.log(`::: jsonData -> ${jsonString}`);

        fs.writeFileSync(`${tempPath}/mock.json`, jsonString);

        console.log('::: Saida Endpoint criação de json temp ::: ', new Date());
    } catch (error) {
        console.error('Erro ao criar Json Temporario:', error);
    }
}




module.exports = {
    confirmaJsonExistente,
    evitarChamadaFavicon,
    buscarJsonTemporario
}