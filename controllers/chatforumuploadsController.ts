export {};
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    const dir = path.join(__dirname, '../chatforumuploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req: any, file: any, cb: any) => {
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    // } else {
    //   cb(new Error('Only .jpeg and .png files are allowed!'), false);
    // }
  }
}).single('file');

const forumuploadFile = asyncHandler((req: any, res: any): void => {
  upload(req, res, (err: any) => {
    if (err) {
      return res.json({ error: err.message });
    }
    if (req.file) {
        const protocol = req.protocol === 'http' ? 'https' : req.protocol;
        const baseUrl = `${protocol}://${req.get('host')}`;
        const filePath = `/chatforumuploads/${req.file.filename}`;
        const fullUrl = `${baseUrl}${filePath}`;
        res.json({ fullUrl });
      } else {
        res.json({ error: 'Failed to upload the file' });
      }
  });
});


module.exports = { forumuploadFile };
