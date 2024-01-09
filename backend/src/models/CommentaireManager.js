const AbstractManager = require("./AbstractManager");

class CommentaireManager extends AbstractManager {
  constructor() {
    super({ table: "Commentaire" });
  }

  // création d'un post
  insert(user, text, userId, postId) {
    return this.connection.query(
      `insert into ${this.table} (Pseudo_Utilisateur, Contenu, ID_Utilisateur, ID_Post) values (?,?, ?, ?)`,
      [user, text, userId, postId]
    );
  }

  findById(postId) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE ID_Post= ? ORDER BY Date_Creation ASC`,
      [postId]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET username = ?, email = ?, company = ? WHERE email = ?`,
      [item.username, item.email, item.company, item.id]
    );
  }

  findByLogin(login) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [login]
    );
  }

  deleteByEmail(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE email = ?`, [
      id,
    ]);
  }
}

module.exports = CommentaireManager;
