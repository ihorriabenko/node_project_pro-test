const { User } = require("../../models/user");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { email, _id } = req.user;
  const { path: tmpPath, filename } = req.file;

  // change file name to id.uuid.ext
  const splitedFilename = filename.split(".");
  splitedFilename.splice(0, 0, _id);
  const newFileName = splitedFilename.join(".");

  // avatarFolder + filename
  const avatarsPath = path.join(path.resolve("./public/avatars"), newFileName);

  // jimp
  Jimp.read(tmpPath)
    .then((avatar) => {
      // resize
      avatar.resize(250, 250).quality(60).write(avatarsPath);

      // delete old file
      fs.unlink(tmpPath, (err) => {
        if (err) throw err;
        console.log("file was deleted");
      });

      return avatar;
    })
    .catch((err) => {
      console.error(err);
    });

  // update avatarUrl
  const user = await User.findOneAndUpdate(
    { email },
    { avatarURL: newFileName },
    { returnOriginal: false }
  );

  // response
  res.json({ avatarURL: `/avatars/${user.avatarURL}` });
};

module.exports = updateAvatar;
