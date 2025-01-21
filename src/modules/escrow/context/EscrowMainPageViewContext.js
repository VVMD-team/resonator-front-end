import { createContext, useContext, useState } from "react";

const EscrowMainPageViewContext = createContext();

export function EscrowMainPageViewProvider({ children }) {
  const [view, setView] = useState("main"); // main | mob_notifications

  const changeView = (view) => {
    setView(view);
  };

  return (
    <EscrowMainPageViewContext.Provider value={{ view, changeView }}>
      {children}
    </EscrowMainPageViewContext.Provider>
  );
}

export const useEscrowMainPageView = () => {
  const context = useContext(EscrowMainPageViewContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useEscrowMainPageView must be used in a EscrowMainPageViewProvider"
    );
  }

  return context;
};

export const EscrowMainPageViewConsumer = EscrowMainPageViewContext.Consumer;
