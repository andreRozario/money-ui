const express = require('express');

const path = require('path/posix');

const jwt = require("jsonwebtoken");

const app = express();

const dist = '/dist';

const middlewareValidateJWT = (request, response, next) => {

  const authorization = request.headers["authorization"];

  const token = authorization ? authorization.split(" ")[1] : null;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

      if (error && request.originalUrl !== '/login')

        response.status(403).send("Invalid Token");

      request.user = user;

      next();
  });
};

app.use(express.static(`${__dirname}${dist}`));

app.get('/*', middlewareValidateJWT, (_request, response) => {

  response.sendFile(path.join(`${__dirname}${dist}/index.html`));
});

app.listen(process.env.PORT || 4200);
