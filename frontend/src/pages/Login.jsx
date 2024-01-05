import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";
import Context from "../context/Context";
import "../styles/login.css";

function Login() {
  const { setIsConnected, setInfoUser } = useContext(Context);
  const [alert, setAlert] = useState({
    type: "announce",
    message: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.error(credentials);
    api
      .post("/auth", {
        email: credentials.email,
        password: credentials.password,
      })
      .then((result) => {
        if (result.status === 401 || result.status === 500) {
          console.error("erreur de connexion");
          setAlert({
            type: "alert",
            message: "erreur de connexion",
          });
        } else {
          setIsConnected(true);
          setInfoUser({
            email: result.data.email,
            type: result.data.type,
          });
          sessionStorage.setItem("email", result.data.email);
          sessionStorage.setItem("firstname", result.data.firstname);
          sessionStorage.setItem("lastname", result.data.lastname);
          sessionStorage.setItem("pseudo", result.data.pseudo);
          sessionStorage.setItem("isConnected", true);
          if (result.data.type === "admin") {
            console.error("on est admin");
            sessionStorage.setItem("type", result.data.type);
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      });
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
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  });
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
              Connexion
            </button>
          </label>
          <section
            id="create-account"
            onClick={() => {
              navigate("/connexion");
            }}
          >
            Pas encore de compte ?{" "}
          </section>
        </form>
      </div>
    </>
  );
}

export default Login;
