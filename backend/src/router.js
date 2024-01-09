const express = require("express");
const fileUpload = require("express-fileupload");
const fileControllers = require("./controllers/fileControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const postsControllers = require("./controllers/postsControllers");
const commentaireControllers = require("./controllers/commentaireControllers");

const {
  userExist,
  //   checkAdmin,
  //   checkUser,
  //   refreshToken,
} = require("./helpers/auth");

const router = express.Router();
router.use(fileUpload());

router.post("/uploadFile", fileControllers.add);
router.get("/users/check/:id", userControllers.checkUserExist);
router.post("/users/create", userExist, userControllers.add);
router.post("/auth", authControllers.session);
router.post("/logout", authControllers.logout);
router.get("/posts", postsControllers.browse);
router.post("/posts", postsControllers.add);
router.post("/commentaire", commentaireControllers.add);
router.get("/commentaire/:postId", commentaireControllers.read);

// const availabilityControllers = require("./controllers/availabilityControllers");
// const messagesControllers = require("./controllers/messagesControllers");
// const apointmentControllers = require("./controllers/apointmentControllers");

// // routes non sécurisées
// router.get("/availability", availabilityControllers.browse);
// router.get("/availability/:id", availabilityControllers.read);
// router.post("/messages", messagesControllers.add);
// router.post("/apointment", apointmentControllers.add);
// router.post("/availability", availabilityControllers.add);
// router.get("/apointment/:id", apointmentControllers.read);

// // routes sécurisée utilisateur
// router.get("/messages/:id", checkUser, refreshToken, messagesControllers.read);

// // routes sécurisées Admin
// router.get("/auth/admin", checkAdmin, refreshToken, authControllers.admin);
// router.delete("/users/:id", checkAdmin, refreshToken, userControllers.destroy);
// router.get("/users", checkAdmin, refreshToken, userControllers.browse);
// router.put("/users/:id", checkAdmin, refreshToken, userControllers.edit);
// router.delete(
//   "/availability/:id",
//   checkAdmin,
//   refreshToken,
//   availabilityControllers.destroy
// );
// router.get(
//   "/apointment",
//   checkAdmin,
//   refreshToken,
//   apointmentControllers.browse
// );
// router.get("/messages/", checkAdmin, refreshToken, messagesControllers.browse);

module.exports = router;
