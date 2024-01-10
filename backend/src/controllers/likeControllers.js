const models = require("../models");

const browse = (req, res) => {
  models.item
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id, type, email } = req.params;
  models.Utilisateur.findByLogin(email).then((result) => {
    if (result[0] !== null) {
      models.Likes.findByUserId(
        parseInt(id, 10),
        type,
        result[0][0].ID_Utilisateur
      )
        .then((results) => {
          console.error(results[0]);
          if (results[0].length > 0) {
            res.send({ isExisting: true, ID_Like: results[0][0].ID_Like });
          } else {
            res.send(false);
          }
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
    }
  });
};

const edit = (req, res) => {
  const item = req.body;

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10);

  models.item
    .update(item)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  console.error(req.body);
  const { id, type, email } = req.body;
  models.Utilisateur.findByLogin(email).then((results) => {
    if (results[0] !== null) {
      models.Likes.insert(id, type, results[0][0].ID_Utilisateur)
        .then(([result]) => {
          res.location(`/like/${result.insertId}`).sendStatus(201);
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
    }
  });
};

const destroy = (req, res) => {
  const { idLikeToDelete } = req.params;
  models.Likes.deleteLike(idLikeToDelete)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
