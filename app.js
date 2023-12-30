const express = require('express');
const app = express();
const port = 3001;

const routes = require('./route/rotasMock');

app.use(express.static('view'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});