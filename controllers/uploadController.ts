export {}
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require("dotenv");
dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg','webp','gif','JPG','PNG','JPEG'],
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ url: req.file.path });
};

module.exports = {
  upload,
  uploadFile,
};
