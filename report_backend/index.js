'use strict';
require("dotenv").config();
const fs = require('fs'),
    http = require('http'),
    path = require('path');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({
  strict: false
}));
const oasTools = require('oas-tools');
const jsyaml = require('js-yaml');
const serverPort = 8080;


app.use(require('cors')());

app.use(
  require("express-session")({
    secret: "keyboard cat",
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // 3 Hour
      secure: false,
      httpOnly: false
    },
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
const oasDoc = jsyaml.load(spec);

const options_object = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: false,
  router: true,
  validator: true
};

oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function() {
  http.createServer(app).listen(serverPort, function() {
    console.log("App running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (options_object.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
      console.log("________________________________________________________________");
    }
  });
});

app.get('/info', function(req, res) {
  res.send({
    info: "This API was generated using oas-generator!",
    name: oasDoc.info.title
  });
});


app.use(express.static(path.join(__dirname, '/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});