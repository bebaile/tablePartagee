import React, { createContext, useState } from "react";

const Context = createContext();

export default Context;

export function ContextProvider({ children }) {
  const [isConnected, setIsConnected] = useState(
    sessionStorage.getItem("isConnected")
  );

  const [infoUser, setInfoUser] = useState({
    email: sessionStorage.getItem("email"),
    type: sessionStorage.getItem("type"),
  });

  const [updateRequired, setUpdateRequired] = useState(true); // update du nombre de likes

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        setIsConnected,
        infoUser,
        setInfoUser,
        setUpdateRequired,
        updateRequired,
      }}
    >
      {children}
    </Context.Provider>
  );
}
