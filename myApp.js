const express = require('express');
const app = express();

var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

let helmet = require('helmet')

app.use(helmet.hidePoweredBy({ setTo: ninetyDaysInSeconds }))
app.use(helmet.frameguard({ action: 'Deny' }))
app.use(helmet.xssFilter())
app.use(helmet.ieNoOpen())
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }))


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
