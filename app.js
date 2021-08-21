const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

import router from "./routes/index";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.use((req, res) => {
  res.status(404).send("<h2>Ops...Page not found</h2>");
});

const server = http.createServer(app);

server.listen(8080);
