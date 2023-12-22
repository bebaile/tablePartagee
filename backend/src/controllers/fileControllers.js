const path = require("path");

const assetsFolder = path.join(__dirname, "../../uploads");

const add = (req, res) => {
  console.error(req.files);
  const { image } = req.files;
  image.mv(path.join(assetsFolder, image.name));
  res.sendStatus(200);
};

module.exports = {
  add,
};
