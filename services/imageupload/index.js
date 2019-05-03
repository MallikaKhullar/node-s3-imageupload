var express = require('express');
var router = express.Router();
var imageUploadAPI = new(require('./api.js'))();

router.post('/file-upload', function(req, res) {
    imageUploadAPI['uploadFile'].bind(imageUploadAPI)(req, res, function callback(imageUrl) {
        res.json({ "imageUrl": imageUrl });
    });
});

router.post('/url-upload', function(req, res) {
    imageUploadAPI['uploadUrl'].bind(imageUploadAPI)(req, res, function callback(imageUrl) {
        res.json({ "imageUrl": imageUrl });
    });
});

module.exports = router;