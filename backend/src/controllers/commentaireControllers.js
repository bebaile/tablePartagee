const models = require("../models");

const browse = (req, res) => {
  models.Post.findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { email } = req;
  models.messages
    .findById(req.id, email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
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

  models.messages
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
  const { email, user, text, postId } = req.body;
  models.Utilisateur.findByLogin(email).then((results) => {
    if (results[0] !== null) {
      const id = results[0][0].ID_Utilisateur;
      models.Commentaire.insert(user, text, id, postId)
        .then(([result]) => {
          res.location(`/items/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      models.Commentaire.insert(user, text, "", postId)
        .then(([result]) => {
          res.location(`/items/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  });
};

// TODO validations (length, format...)
const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.messages
    .deletemessages(id)
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
