const express = require('express');

const cors = require('cors');

const path = require('path');

const app = express();

const server = require('https').Server(app);

const dist = '/dist/money-ui';

app.use(express.static(path.join(__dirname, dist)));

app.get('/*', (_request, response) => {

  response.sendFile(path.join(__dirname, dist, '/index.html'));
});

server.listen(process.env.PORT || 4200);
