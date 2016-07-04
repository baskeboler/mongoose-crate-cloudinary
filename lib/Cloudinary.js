'use strict'

var cloudinary = require('cloudinary');
var check = require('check-types');
var debug = require('debug')('mongoose-crate-cloudinary:CloudinaryStorageProvider');

class CloudinaryStorageProvider {
    constructor(options) {
        this._options = options;
        debug(`options: ${JSON.stringify(this._options)}`);
        if (!process.env.CLOUDINARY_URL) {
            debug('No cloudinary url env variable available, enforcing config object');
            check.assert.string(this._options.cloud_name, 'A cloud name to store files in must be specified');
            check.assert.string(this._options.api_key, 'A Cloudinary api key must be specified');
            check.assert.string(this._options.api_secret, 'A Cloudinary api secret must be specified');
        }
        cloudinary.config(this._options);

    }

    save(attachment, callback) {
        cloudinary.uploader.upload(attachment.path, (result) => {
            debug(`Got response from cloudinary: ${JSON.stringify(result)}`);
            callback(null, result.url);
        });
    }

    remove(attachment, callback) {
        var ids = [attachment.url.public_id];
        cloudinary.api.delete_resources(ids, (res) => {
            var err = null;
            if (res.error) err = res.err;
            callback(err);
        });
    }
}

module.exports = CloudinaryStorageProvider;
