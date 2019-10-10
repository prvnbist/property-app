var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, `./uploads/`);
        } else {
            cb(
                {
                    message:
                        'this file is neither a video or image file',
                },
                false,
            );
        }
    },
    filename: function(req, file, cb) {
        cb(
            null,
            `${Date.now()}.${
                file.originalname.split('.').reverse()[0]
            }`,
        );
    },
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}).any();
module.exports = upload;
