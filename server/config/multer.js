const multer = require("multer");
const moment = require("moment");

//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        moment().format("YYYYMMDDhhmm") +
        "-" +
        file.originalname
    );
  }
});
// const storage = multer.memoryStorage();
// filter non-image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 1024 * 1024 * 5
  // },
  fileFilter: fileFilter
});

module.exports = upload;
