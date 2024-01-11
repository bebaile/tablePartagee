import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "@services/services";
import Context from "../context/Context";
import icn from "@assets/connect-icon.png";

function NavBar() {
  const { isConnected, setIsConnected, infoUser, setInfoUser } =
    useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

  // Cache la bare de navigation si l'on fait défiler la page
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  // document.addEventListener("scroll", () => {
  //   setIsNavBarVisible(false);
  //   setTimeout(() => {
  //     setIsNavBarVisible(true);
  //   }, 1000);
  // });

  const handleDisconnect = () => {
    api.post("/logout").then(() => {
      setIsConnected(false);
      sessionStorage.clear("email");
      sessionStorage.clear("firstname");
      sessionStorage.clear("isConnected");
      sessionStorage.clear("lastname");
      sessionStorage.clear("pseudo");
      navigate("/");
      return { isConnected: false };
    });
  };

  return (
    <>
      <div>
        <div
          className={
            isNavBarVisible && location.pathname === "/"
              ? "navbar"
              : "hidden-navbar"
          }
        >
          <div id="pseudo">
            <img src={icn} id="connect-icn" alt="icone pour se connecter" />
            {isConnected ? sessionStorage.getItem("pseudo") : null}
          </div>
          <div className="connect-btn-navbar">
            {isConnected ? (
              <div onClick={handleDisconnect}>Se déconnecter</div>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Se connecter
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
