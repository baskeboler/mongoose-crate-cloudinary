'use strict'

const cloudinary = require('cloudinary');
const check = require('check-types');

class CloudinaryStorageProvider {
    constructor (options){
	this._options = options;
        check.assert.object(this._options, 'Please pass some options to LocalFS')
    check.assert.string(this._options.cloud_name, 'A cloud name to store files in must be specified')
    check.assert.string(this._options.api_key, 'A Cloudinary api key must be specified')
    check.assert.string(this._options.api_secret, 'A Cloudinary api secret must be specified')

    }

    save(attachment, callback) {
        cloudinary.uploader.upload(attachment.path, (result) => {
            callback(null, result);
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
