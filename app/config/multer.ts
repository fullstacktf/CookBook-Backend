import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'assets',
  filename: (req, file, callback) => {
    callback(null, uuid() + path.extname(file.originalname));
  }
});

export default multer({ storage });