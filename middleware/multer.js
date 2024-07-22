const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "assets/images");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "assets/videos");
    } else {
      cb(new Error("Invalid file type"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = {upload}
