-- Création de la base de données
CREATE DATABASE IF NOT EXISTS Table_Partagee;
USE Table_Partagee;

-- Création de la table Utilisateur
CREATE TABLE Utilisateur (
    ID_Utilisateur INT PRIMARY KEY AUTO_INCREMENT,
    Nom_Utilisateur VARCHAR(255) NOT NULL,
    Mot_de_passe VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

-- Création de la table Message
CREATE TABLE Message (
    ID_Message INT PRIMARY KEY AUTO_INCREMENT,
    Contenu TEXT,
    Date_Creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Likes
CREATE TABLE Likes (
    ID_Like INT PRIMARY KEY AUTO_INCREMENT,
    Type VARCHAR(50) NOT NULL,
    ID_Element INT NOT NULL,
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Post
CREATE TABLE Post (
    ID_Post INT PRIMARY KEY AUTO_INCREMENT,
    Contenu TEXT,
    Date_Creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Recette
CREATE TABLE Recette (
    ID_Recette INT PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(255),
    Ingrédients TEXT,
    Instructions TEXT,
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Événement
CREATE TABLE Evenement (
    ID_Evenement INT PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(255),
    Date_Heure DATETIME,
    Description TEXT,
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Amis
CREATE TABLE Amis (
    ID_Amitie INT PRIMARY KEY AUTO_INCREMENT,
    ID_Utilisateur1 INT,
    ID_Utilisateur2 INT,
    FOREIGN KEY (ID_Utilisateur1) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Utilisateur2) REFERENCES Utilisateur(ID_Utilisateur)
);

-- Création de la table Abonnements
CREATE TABLE Abonnements (
    ID_Abonnement INT PRIMARY KEY AUTO_INCREMENT,
    ID_Abonne INT,
    FOREIGN KEY (ID_Abonne) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Abonnement) REFERENCES Utilisateur(ID_Utilisateur)
);
