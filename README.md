# mongoose-crate-cloudinary
cloudinary storage provider for mongoose-crate

## usage

```javascript 
var crate = require('mongoose-crate'),
    CloudinaryStorageProvider = require('mongoose-crate-cloudinary');

// Only necessary if CLOUDINARY_URL env var not set. 
// Else instantiate with empty config object.
var storageProvider = new CloudinaryStorageProvider({
    cloud_name: 'YOUR CLOUD NAME',
    api_key: 'YOUR API KEY',
    api_secret: 'YOUR API SECRET
});

// Use in mongoose schema .. 
PictureSchema.plugin(crate, {
    storage: storageProvider,
    fields: {
        image: {}
    }
});
```