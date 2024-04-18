import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueIdentifier = uuidv4(); // Generate UUID
    const filename = `${uniqueIdentifier}_${file.originalname}`;
    cb(null, Date.now() + filename);
  },
});

export const upload = multer({ storage: storage });
