import multer from 'multer';
import path from 'path';

const storage = (dest) => {
  return multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `public/${dest}`);
    },
    filename(req, file, cb) {
      const filename = Date.now() + path.extname(file.originalname);

      cb(null, filename);
    },
  });
};

export const upload = (destin) => {
  return multer({ storage: storage(destin) });
};
