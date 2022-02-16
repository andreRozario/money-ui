const express = require('express');

const path = require('path');

// const jwt = require("jsonwebtoken");

const app = express();

const dist = '/dist/money-ui';

// const privateKey = "u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H";

// jwt.sign({ client: 'angular' }, privateKey, { algorithm: 'HS256'});

// const middlewareValidateJWT = (request, response, next) => {

//   const authorization = request.headers["authorization"];

//   const token = authorization ? authorization.split(" ")[1] : null;

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

//       if (error && request.originalUrl !== '/login')

//         response.status(403).send("Invalid Token");

//       request.user = user;

//       next();
//   });
// };

app.use(express.static(path.join(__dirname, dist)));

app.get('/*', (_request, response) => {

  response.sendFile(path.join(__dirname, dist, '/index.html'));
});

app.listen(process.env.PORT || 4200);
