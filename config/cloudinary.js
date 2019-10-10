const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

exports.uploads = async files => {
    let res_promises = await files.map(
        file =>
            new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(
                    file,
                    {
                        folder: '/Propery-App/properties',
                    },
                    function(error, result) {
                        if (error) reject(error);
                        else resolve(result.url);
                    },
                );
            }),
    );
    const data = await Promise.all(res_promises)
        .then(result => result)
        .catch(error => {
            console.log(error);
        });
    return data;
};
