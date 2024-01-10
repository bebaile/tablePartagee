const AbstractManager = require("./AbstractManager");

class LikesManager extends AbstractManager {
  constructor() {
    super({ table: "Likes" });
  }

  findByUserId(elementId, type, userId) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE Type = ? AND ID_Element = ? AND ID_Utilisateur = ?`,
      [type, elementId, userId]
    );
  }

  insert(id, type, userId) {
    return this.connection.query(
      `insert into ${this.table} (Type, ID_Element, ID_Utilisateur) values (?, ?, ?)`,
      [type, id, userId]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }

  deleteLike(id) {
    return this.connection.query(
      `delete from ${this.table} where ID_Like = ?`,
      [id]
    );
  }
}

module.exports = LikesManager;
