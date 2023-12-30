
// Função para preencher as opções de pasta
async function preencherPastas() {
    const response = await fetch('/api/folders');
    const folders = await response.json();

    console.log("folders: " + folders);

    const foldersDropdown = document.getElementById('folders');

    // Setar valor default
    const defaultOption = document.createElement('option');
    defaultOption.text = "Selecionar";
    defaultOption.disabled = true; // Torna o valor padrão não selecionável
    defaultOption.selected = true; // Define o valor padrão como selecionado inicialmente
    foldersDropdown.add(defaultOption);

    folders.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder;
        option.text = folder;
        foldersDropdown.add(option);
    });

    // Atualiza a lista de arquivos quando a pasta é alterada
    foldersDropdown.addEventListener('change', preencherArquivos);
}


// Função para preencher as opções de arquivo
async function preencherArquivos() {
    const folderName = document.getElementById('folders').value;
    const response = await fetch(`/api/files/${folderName}`);
    const files = await response.json();

    const filesDropdown = document.getElementById('files');
    filesDropdown.innerHTML = ''; // Limpa as opções anteriores

    const respostaDiv = document.getElementById('urlpath');
    respostaDiv.innerHTML = '';

    console.log("files: " + files);

    files.forEach(file => {
        const option = document.createElement('option');
        option.value = file;
        option.text = file;
        filesDropdown.add(option);
    });

    filesDropdown.addEventListener('change', exibirPathJson);
    exibirPathJson();
}


async function exibirPathJson() {
    const folderName = document.getElementById('folders').value;
    const fileName = document.getElementById('files').value;

    try {
        const response = await fetch(`/api/json/${folderName}/${fileName}`);
        const jsonData = await response.json();
        const endpointPath = jsonData.folder.endpoint;

        if ((response.status === 200) && (endpointPath !== null)) {
            const respostaDiv = document.getElementById('urlpath');
            respostaDiv.innerHTML = JSON.stringify("Endpoint Path: " + endpointPath, null, 2);
        } else {
            alert(`O servidor retornou um status inesperado: ${endpointResponse.status}`);
        }

    } catch (error) {
        console.error(`Erro ao exibir path do JSON: ${error.message}`);
    }
}


async function exibirDadosJSON() {
    const folderName = document.getElementById('folders').value;
    const fileName = document.getElementById('files').value;

    try {
        const response = await fetch(`/api/json/${folderName}/${fileName}`);
        const jsonData = await response.json();

        if (response.status === 200) {
            const respostaDiv = document.getElementById('resposta');
            respostaDiv.innerHTML = JSON.stringify(jsonData, null, 2);
        } else {
            alert(`O servidor retornou um status inesperado: ${endpointResponse.status}`);
        }

        console.log('Dados do JSON escolhido:', jsonData);
    } catch (error) {
        alert(`Erro ao exibir dados do JSON: ${error.message}`);
    }
}

// Inicializa a página
preencherPastas();