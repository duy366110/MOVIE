const express = require("express");
const bodyParser = require("body-parser");
const middlewareCors = require("./middleware/middleware-cors");
const router = require("./router/router");

const app = express();
const emvironment = require("./environment");

app.use(middlewareCors.accept);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

app.listen(emvironment.server.port, (error) => {
    if(error) throw error;
    console.log("Start server successfull");

});