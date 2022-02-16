const express = require('express');

const app = express();

const path = '/dist/money-ui';

const middlewareValidarJWT = (request, response, next) => {

  const jwt = request.headers["authorization"];

  const privateKey = "u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H";

  const jwtService = require("jsonwebtoken");

  jwtService.verify(jwt, privateKey, (error, userInfo) => {

      if (error && request.originalUrl !== '/login') {

        response.status(403).end();

        return;
      }

      request.userInfo = userInfo;

      next();
  });
};

app.use(express.static(`${__dirname}${path}`));

app.get('/*', middlewareValidarJWT, (_request, response) => {

  response.sendFile(`${__dirname}${path}/index.html`);
});

app.listen(process.env.PORT || 4200);
