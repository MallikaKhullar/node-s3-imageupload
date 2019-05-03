'use strict';

var s3Multer = require('./../../controller/s3Controller');
var request = require('request');
var awsClient = require('./../../clients/awsS3Client');
var fs = require('fs');

function ImageUploadAPI() {}

ImageUploadAPI.prototype.uploadFile = function(req, res, cb) {
    s3Multer.single('image')(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
        }
        cb(req.file.location);
    });
}

ImageUploadAPI.prototype.uploadUrl = function(req, res, cb) {
    var options = {
        uri: req.body.uri,
        encoding: null // todo change as required
    };

    request(options, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log("Image download failed!", error);
        } else {
            awsClient.getInstance().uploadImage(body, function(imageUrl) {
                cb(imageUrl);
            });
        }
    });
}

module.exports = ImageUploadAPI;