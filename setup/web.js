const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static('web'));

//listar pastas
app.get('/api/folders', (req, res) => {
  limpaPastaTemp();

  const folderPath = './json';
  const folders = fs.readdirSync(folderPath)
    .filter(file => fs.statSync(path.join(folderPath, file))
      .isDirectory());

  res.json(folders);
});

//listar arquivos
app.get('/api/files/:folderName', (req, res) => {
  limpaPastaTemp();

  const folderName = req.params.folderName;
  const folderPath = `./json/${folderName}`;
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

  res.json(files);
});

//endpoint de confirmação
app.get('/api/json/:folderName/:fileName', (req, res) => {
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


//Endpoint para não ficar chamando favicon em meu endpoint
app.get('/favicon.ico', function(req, res) { 
  console.log('Chamada favicon');
  res.status(204);
  res.end();    
});

//Endpoint Busca Temporario
app.get('/:sourcePath', (req, res) => {
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

//Endpoint a ser chamado pelo backend
// app.get('/:folderName', async (req, res) => {
//   const folderName = req.params.folderName;

//   try {
//     const files = await fs.readdir(`./json/${folderName}`);
//     const jsonFiles = files.filter(file => file.endsWith('.json'));

//     if (jsonFiles.length > 0) {
//       // Se houver pelo menos um arquivo JSON válido, retornar as informações do primeiro arquivo
//       const filePath = path.join(__dirname, `json/${folderName}/${jsonFiles[0]}`);
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       const jsonData = JSON.parse(fileContent);
//       res.json(jsonData);
//     } else {
//       res.status(404).json({ error: `Nenhum arquivo JSON válido encontrado na pasta ${folderName}.` });
//     }
//   } catch (error) {
//     console.error(`Erro ao processar a requisição para a pasta ${folderName}:`, error);
//     res.status(500).json({ error: `Erro ao processar a requisição para a pasta ${folderName}.` });
//   }
// });

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

//Endpoint que cria o json para o backend
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



app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});