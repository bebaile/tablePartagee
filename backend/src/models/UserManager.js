const AbstractManager = require("./AbstractManager");

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: "Utilisateur" });
  }

  // création d'un utilisateur
  insert(uuid, item) {
    return this.connection.query(
      `insert into ${this.table} (ID_Utilisateur, Email, Prenom_Utilisateur, Nom_Utilisateur, Pseudo_Utilisateur, Naissance_Utilisateur, Mot_de_passe) values (?,?,?,?,?,?,?)`,
      [
        uuid,
        item.email,
        item.firstname,
        item.lastname,
        item.pseudo,
        item.birthdate,
        item.password,
      ]
    );
  }

  insertGuest(user) {
    return this.connection.query(
      `insert into ${this.table} (id_user, password, email, firstname, lastname, company, type) values (?,?,?,?,?,?,?)`,
      [
        user.id,
        user.password,
        user.email,
        user.firstname,
        user.lastname,
        user.company,
        user.type,
      ]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${this.table} SET Prenom_Utilisateur = ?, Email = ?, Pseudo_Utilisateur = ?, Naissance_Utilisateur = ? WHERE Email = ?`,
      [item.firstname, item.email, item.pseudo, item.birthdate, item.id]
    );
  }

  findByLogin(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE Email = ?`,
      [email]
    );
  }

  findIdByEmail(email) {
    return this.connection.query(
      `SELECT ID_Utilisateur FROM ${this.table} WHERE Email = ?`,
      [email]
    );
  }

  deleteByEmail(id) {
    return this.connection.query(`DELETE FROM ${this.table} WHERE Email = ?`, [
      id,
    ]);
  }
}

module.exports = UtilisateurManager;
