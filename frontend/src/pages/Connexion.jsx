import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Connexion() {
  const [isSubscribing, setIsSubscribing] = useState(true);
  const [arePasswordEqual, setArePasswordEqual] = useState(true);
  const [alert, setAlert] = useState({
    type: "announce",
    message: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    birthdate: "",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();

  const checkEmail = (e) => {};

  const handleSubmit = () => {
    console.error(credentials);
  };

  return (
    <>
      <div className="container">
        <div
          className={
            alert.type === "alert"
              ? "alert"
              : alert.type === "announce"
              ? "announce"
              : ""
          }
        >
          {alert.message}
        </div>
        <form>
          <label htmlFor="firstname">
            <div>Prénom :</div>
            <div>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Inscrivez votre prénom"
                onChange={(e) => {
                  setIsSubscribing(true);
                  setCredentials({
                    ...credentials,
                    firstname: e.target.value,
                  });
                }}
              />
            </div>
          </label>
          <label htmlFor="lastname">
            <div>Nom :</div>
            <div>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Inscrivez votre nom"
                onChange={(e) => {
                  setIsSubscribing(true);
                  setCredentials({
                    ...credentials,
                    lastname: e.target.value,
                  });
                }}
              />
            </div>
          </label>
          <label htmlFor="pseudo">
            <div>Pseudo :</div>
            <div>
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                placeholder="Inscrivez votre pseudo"
                onChange={(e) => {
                  setIsSubscribing(true);
                  setCredentials({
                    ...credentials,
                    pseudo: e.target.value,
                  });
                }}
              />
            </div>
          </label>
          <label htmlFor="courriel">
            <div>Courriel :</div>
            <div>
              <input
                type="text"
                id="courriel"
                name="courriel"
                placeholder="Entrez votre email"
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
                onBlur={isSubscribing ? checkEmail : null}
                className={
                  alert.message === "L'utilisateur existe déjà"
                    ? "incorrect"
                    : ""
                }
              />
            </div>
          </label>
          <label htmlFor="birthdate">
            <div>Date de naissance :</div>
            <div>
              <input
                type="text"
                id="birthdate"
                name="birthdate"
                placeholder="Entrez votre date de naissance"
                onChange={(e) => {
                  setCredentials({ ...credentials, birthdate: e.target.value });
                }}
              />
            </div>
          </label>

          <label htmlFor="password">
            <div>Mot de passe :</div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez un mot de passe sécurisé"
                className={arePasswordEqual ? null : "incorrect"}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </label>

          <label htmlFor="confirmed-password">
            <div>Confirmation :</div>
            <div>
              <input
                type="password"
                id="confirmed-password"
                name="confirmed-password"
                placeholder="... Et confirmez ce mot de passe !"
                className={arePasswordEqual ? null : "incorrect"}
                onChange={(e) => {
                  setIsSubscribing(true);
                  setCredentials({
                    ...credentials,
                    confirmedPassword: e.target.value,
                  });
                }}
                onBlur={(e) => {
                  if (e.target.value !== credentials.password) {
                    setAlert({
                      type: "alert",
                      message: "Vos mots de passes ne correspondent pas",
                    });
                  } else {
                    setAlert({
                      type: "announce",
                      message: "",
                    });
                  }
                }}
              />
            </div>
          </label>

          <label htmlFor="submit">
            <button
              type="button"
              id="submit"
              className="connect-btn"
              onClick={handleSubmit}
            >
              S'inscrire
            </button>
          </label>
        </form>
      </div>
    </>
  );
}

export default Connexion;
