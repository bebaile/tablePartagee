const models = require("../models");
const { verifyPassword, createToken } = require("../helpers/auth");

const session = (req, res) => {
  const { email, password } = req.body;
  models.Utilisateur.findByLogin(email)
    .then((rows) => {
      if (rows === 0) {
        res.status(401).send("login ou mot de passe incorrect");
      } else {
        verifyPassword(password, rows[0][0].Mot_de_passe).then((isVerified) => {
          if (isVerified) {
            const {
              // eslint-disable-next-line camelcase
              Prenom_Utilisateur,
              // eslint-disable-next-line camelcase
              Nom_Utilisateur,
              // eslint-disable-next-line camelcase
              Pseudo_Utilisateur,
              type,
            } = rows[0][0];

            const token = createToken({
              // eslint-disable-next-line camelcase
              firstname: Prenom_Utilisateur,
              // eslint-disable-next-line camelcase
              lastname: Nom_Utilisateur,
              email,
              // eslint-disable-next-line camelcase
              pseudo: Pseudo_Utilisateur,
              type,
            });
            res
              .status(201)
              .cookie("user_token", token, {
                httpOnly: true,
                sameSite: "lax",
                expires: new Date(Date.now() + 15 * 60 * 1000),
              })
              .json({
                message: "utilisateur authentifié",
                cookie: token,
                email,
                // eslint-disable-next-line camelcase
                firstname: Prenom_Utilisateur,
                // eslint-disable-next-line camelcase
                lastname: Nom_Utilisateur,
                // eslint-disable-next-line camelcase
                pseudo: Pseudo_Utilisateur,
                type,
              });
          } else {
            res.status(401).send("Login ou mot de passe incorrect(s)");
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const logout = (req, res) => {
  res.cookie("user_token", "", { maxAge: 0 }).sendStatus(200);
};

const admin = (req, res) => {
  if (req.type === "admin") {
    res.status(200).send("L'utilisateur est bien admin");
  }
};

module.exports = {
  session,
  logout,
  admin,
};
