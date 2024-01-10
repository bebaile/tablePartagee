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
  models.item
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
  models.item
    .delete(req.params.id)
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
