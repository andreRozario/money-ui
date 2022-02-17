const express = require('express');

const path = require('path');

const app = express();

const dist = '/dist/money-ui';

app.use(express.static(path.join(__dirname, dist)));

app.use(sessions({
  cookie        : {
    httpOnly : true,
    secure   : true
  }
}));

app.get('/*', (_request, response) => {

  response.sendFile(path.join(__dirname, dist, '/index.html'));
});

app.listen(process.env.PORT || 4200);
