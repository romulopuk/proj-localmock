const fs = require('fs');
const path = require('path');

const criaMockJsonExistente = (request) => {
    const folderName = request.params.folderName;
    const fileName = request.params.fileName;
    const filePath = `../json/${folderName}/${fileName}`;

    try {
        const jsonData = require(filePath);
        criaMockJson(folderName, fileName);
        return jsonData;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
    }
}

const chamaMockJsonParaBackend = (request) => {
    const sourcePath = request.params.sourcePath;
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

                return jsonData.statusInfo;
            } else {
                console.error('Endpoint não bateu com Json: ' + jsonData.folder.endpoint);
                res.status(404);
            }

        } catch (error) {
            console.error('Não foi possível encontrar o endpoint', error);
        }

    } else {
        console.error('Endpoint é inválido.', error);
    }
}


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
    criaMockJsonExistente,
    chamaMockJsonParaBackend
}