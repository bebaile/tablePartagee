const AbstractManager = require("./AbstractManager");

class LikesManager extends AbstractManager {
  constructor() {
    super({ table: "Likes" });
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
}

module.exports = LikesManager;
