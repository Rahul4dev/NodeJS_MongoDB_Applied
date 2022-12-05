const express = require("express");
const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  // we pass two keys here dest and filename
  destination: function (req, file, cb) {
    cb(null, "images");
    // two values expected in call-back, an error handling message and a destination where we want to store our file.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
// we can use dest: 'images' to store the file in images folder.
// But storage: option give us the proper storage system with inherited extension of the file.
const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

// single('image') here image comes from the name='image' given when we put the input field.
router.post("/profiles", upload.single("image"), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
    // here we insert only name and path of the data which we have stored in the server.
    // we do not store files in database, just the data related to such files.
  });
  res.redirect("/");
});

module.exports = router;
