import { createContext, useContext, useEffect, useState } from "react";

import { getEscrowById } from "@/modules/escrow/api";

const EscrowSingleContext = createContext();

export function EscrowSingleProvider({ escrowId, children }) {
  const [escrow, setEscrow] = useState(null);

  const updateEscrow = (updatedFields) => {
    setEscrow((prevEscrow) => ({ ...prevEscrow, ...updatedFields }));
  };

  useEffect(() => {
    getEscrowById(escrowId)
      .then((escrow) => {
        setEscrow(escrow);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <EscrowSingleContext.Provider value={{ escrow, updateEscrow }}>
      {escrow ? children : null}
    </EscrowSingleContext.Provider>
  );
}

export const useEscrowSingle = () => {
  const context = useContext(EscrowSingleContext);

  if (typeof context === "undefined") {
    throw new Error("useEscrowSingle must be user in a EscrowSingleProvider");
  }

  return context;
};
