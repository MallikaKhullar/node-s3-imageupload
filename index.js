var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var httpServer = require('http').Server(app);
var imageUploadService = require('./services/imageupload');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use('/images', imageUploadService);
app.set('port', 3000);

if (require.main === module) {
    var server = httpServer.listen(app.get('port'), function() {
        console.log('Server on port ... ' + server.address().port);
    });
}


module.exports.app = app;