import { createContext, useContext, useEffect, useState } from "react";

import LoadingPopup from "./LoadingPopup";

const EscrowSingleLoadingPopupContext = createContext();

export function EscrowSingleLoadingPopupProvider({ children }) {
  const [loadingMessage, setLoadingMessage] = useState("");

  const startLoading = (message) => {
    setLoadingMessage(message);
  };

  const stopLoading = () => {
    setLoadingMessage("");
  };

  const isLoading = !!loadingMessage;

  return (
    <EscrowSingleLoadingPopupContext.Provider
      value={{ isLoading, startLoading, stopLoading }}
    >
      {children}
      {isLoading && <LoadingPopup message={loadingMessage} />}
    </EscrowSingleLoadingPopupContext.Provider>
  );
}

export const useEscrowSingleLoadingPopup = () => {
  const context = useContext(EscrowSingleLoadingPopupContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useEscrowSingleLoadingPopup must be user in a EscrowSingleLoadingPopupContext"
    );
  }

  return context;
};
