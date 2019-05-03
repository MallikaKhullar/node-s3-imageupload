var s3 = require('s3');
var aws = require('aws-sdk');
var smallS3Client = new aws.S3();
var s3Config = require('config').s3Config;


function S3Client() {
    this.client = s3.createClient({
        s3Client: new aws.S3({
            region: s3Config.region,
            endpoint: s3Config.bucketPath,
            accessKeyId: s3Config.accessKeyId,
            secretAccessKey: s3Config.secretAccessKey,
            signatureVersion: 'v4'
        })
    });
}

S3Client.prototype.uploadImage = function(body, cb) {
    console.log(typeof body);
    var key = Date.now().toString();
    smallS3Client.putObject({
        Body: body,
        Key: key,
        Bucket: s3Config.bucket,
        ACL: 'public-read' // change as per your requirements
    }, function(error, data) {
        if (error) {
            console.log("S3 Upload Error: " + error);
            cb(error);
        } else {
            cb("http://" + s3Config.bucket + ".s3." + s3Config.region + ".amazonaws.com/" + key);
        }
    });
}

exports.S3Client = S3Client;
exports.getInstance = function() {
    return new S3Client()
}