-- Création de la base de données
CREATE DATABASE IF NOT EXISTS Table_Partagee;
USE Table_Partagee;

-- Création de la table Utilisateur
CREATE TABLE `Utilisateur` (
  `ID_Utilisateur` BINARY(48) NOT NULL,
  `Nom_Utilisateur` varchar(45) DEFAULT NULL,
  `Mot_de_passe` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Prenom_Utilisateur` varchar(45) DEFAULT NULL,
  `Naissance_Utilisateur` varchar(45) DEFAULT NULL,
  `Pseudo_Utilisateur` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_Utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Création de la table Message
CREATE TABLE Message (
    ID_Message INT PRIMARY KEY AUTO_INCREMENT,
    Contenu TEXT,
    Date_Creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_Utilisateur BINARY(48),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Likes
CREATE TABLE Likes (
    ID_Like INT PRIMARY KEY AUTO_INCREMENT,
    Type VARCHAR(50) NOT NULL,
    ID_Element INT NOT NULL,
    ID_Utilisateur BINARY(48),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Post
CREATE TABLE Post (
    ID_Post INT PRIMARY KEY AUTO_INCREMENT,
    Contenu TEXT,
    Date_Creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_Utilisateur BINARY(48),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Recette
CREATE TABLE Recette (
    ID_Recette INT PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(255),
    Ingrédients TEXT,
    Instructions TEXT,
    ID_Utilisateur BINARY(48),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Événement
CREATE TABLE Evenement (
    ID_Evenement INT PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(255),
    Date_Heure DATETIME,
    Description TEXT,
    ID_Utilisateur BINARY(48),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Amis
CREATE TABLE Amis (
    ID_Amitie INT PRIMARY KEY AUTO_INCREMENT,
    ID_Utilisateur1 BINARY(48),
    ID_Utilisateur2 BINARY(48),
    FOREIGN KEY (ID_Utilisateur1) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Utilisateur2) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Abonnements
CREATE TABLE Abonnements (
    ID_Abonnement BINARY(48) PRIMARY KEY,
    ID_Abonne BINARY(48),
    FOREIGN KEY (ID_Abonne) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Abonnement) REFERENCES Utilisateur(ID_Utilisateur)
);
