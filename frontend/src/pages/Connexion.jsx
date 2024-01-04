import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";
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

  const checkEmail = (e) => {
    api
      .get(`/users/check/${e.target.value}`)
      .then((result) => {
        setAlert({ type: "announce", message: "" });
        console.error(result.status);
      })
      .catch((error) => {
        console.error(error.response.status);
        if (error.response.status === 409) {
          setAlert({ type: "alert", message: "L'utilisateur existe déjà" });
          // e.target.value = "";
        }
        if (error.response.status === 404) {
          setAlert({
            type: "announce",
            message: "Cet identifiant est disponible",
          });
          console.error("Cet identifiant est disponible");
        }
      });
  };

  const checkFilledInputs = () => {
    const checkedValues = [];
    for (const key in credentials) {
      // sans cette condition, on va aussi parcourir les propriétés du prototype
      // eslint-disable-next-line no-prototype-builtins
      if (credentials.hasOwnProperty(key)) {
        if (credentials[key] === "") {
          checkedValues.push(key);
        }
      }
    }

    return checkedValues;
  };

  const handleSubmit = () => {
    console.error(credentials);

    if (isSubscribing === true) {
      // si tous les champs sont remplis, on peut procéder à la création de l'utilisateur
      if (checkFilledInputs().length === 0) {
        if (credentials.password !== credentials.confirmedPassword) {
          setArePasswordEqual(false);
          setAlert({ type: "alert", message: "Mots de passes différents" });
        } else {
          api
            .post("/users/create", {
              email: credentials.email,
              firstname: credentials.firstname,
              lastname: credentials.lastname,
              pseudo: credentials.pseudo,
              birthdate: credentials.birthdate,
              password: credentials.password,
            })
            .then((result) => {
              if (result.data === "Created") {
                setAlert({
                  type: "announce",
                  message: "Utilisateur créé avec succès",
                });
                setTimeout(() => {
                  setIsSubscribing(false);
                }, 3000);
              }
            })
            .catch((error) => {
              if (error.response.status === 409) {
                setAlert({
                  type: "alert",
                  message: "Utilisateur déjà existant",
                });
              }
              if (error.response.status === 422) {
                console.error(error.response.statusText);
              }
            });
        }
      }
      // mais si un des champs est manquant, il faut le signaler
      else {
        setAlert({
          type: "alert",
          message: `Remplissez bien tous les champs`,
        });
        console.error(checkFilledInputs());
      }
    }
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
                type="date"
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
