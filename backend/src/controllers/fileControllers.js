const path = require("path");

const assetsFolder = path.join(__dirname, "../../public/assets/uploads");

const add = (req, res) => {
  console.error(req.files);
  const { image } = req.files;

  try {
    image.mv(path.join(assetsFolder, image.name));
    res.status(200).send(`filename: fileName`);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

module.exports = {
  add,
};
