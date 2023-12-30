// app.js
const { fork } = require('child_process');

// Inicia os servidores de setup e web em processos separados
// const setupProcess = fork('./setup/setup.js');
const webProcess = fork('./setup/web.js');

// setupProcess.on('message', (message) => {
//   console.log(`Setup process message: ${message}`);
// });

webProcess.on('message', (message) => {
  console.log(`Web process message: ${message}`);
});