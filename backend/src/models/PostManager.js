const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "Post" });
  }

  // création d'un post
  insert(user, text) {
    return this.connection.query(
      `insert into ${this.table} (Pseudo_Utilisateur, Contenu) values (?,?)`,
      [user, text]
    );
  }

  findById(id, email) {
    return this.connection.query(
      `SELECT m.*, r.* FROM ${this.table} AS m INNER JOIN meetingrequest AS r ON m.meeting_request_idmeeting_request = r.idmeeting_request WHERE user_id_user = ? OR recipient_email = ? ORDER BY m.create_time ASC`,
      [id, email]
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

module.exports = PostManager;
