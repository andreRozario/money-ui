const express = require('express');

const app = express();

const path = '/dist/money-ui';

app.use(express.static(`${__dirname}${path}`));

app.get('/*', function(request, response) {

  response.sendFile(`${__dirname}${path}/index.html`);
});

app.listen(process.env.PORT || 4200);
