# mongoose-crate-cloudinary
cloudinary storage provider for mongoose-crate

## installation
`$> npm install mongoose-crate-cloudinary --save`

## usage

```javascript 
var crate = require('mongoose-crate'),
    CloudinaryStorageProvider = require('mongoose-crate-cloudinary');

// Only necessary if CLOUDINARY_URL env var not set. 
// Else instantiate with empty config object.
var storageProvider = new CloudinaryStorageProvider({
    cloud_name: 'YOUR CLOUD NAME',
    api_key: 'YOUR API KEY',
    api_secret: 'YOUR API SECRET'
});

// Use in mongoose schema .. 
PictureSchema.plugin(crate, {
    storage: storageProvider,
    fields: {
        image: {}
    }
});
```
the cloudinary image `public_id` will be saved in the url field of the image, for example: 
```javascript
var cloudinary = require('cloudinary');
var pic = new Picture({
    caption: 'image caption',
    otherField: 'blablabla'
});
pic.attach('image', '/path/to/image', (err) => {
    if (err) handleError(err);
    else {
        // image id is in pic.image.url
        var originalImageUrl = cloudinary.url(pic.image.url,{});
        var croppedImageUrl = cloudinary.url(pic.image.url, {
            width: 100,
            height: 150,
            crop: 'fill'
        });
        var croppedImageSecureUrl = cloudinary.url(pic.image.url, {
            secure: true,
            width: 100,
            height: 150,
            crop: 'fill'
        });
    }
});
```