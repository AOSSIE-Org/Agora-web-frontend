//server.js

const express = require('express');

const app = express();

const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Agora-Frontend'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/Agora-Frontend/index.html'));
});

app.listen(process.env.PORT || 8080);