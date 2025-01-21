"use client";

import { useState } from "react";

import { EscrowsActiveConsumer } from "@/modules/escrow/context/EscrowsActiveProvider";

import Button from "@/ui/Button";

import { confirmClose } from "./helpers";

import AddNewEscrowPopup from "./AddNewEscrowPopup";

export default function NewEscrow() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (isConfirm = true) => {
    if (!isConfirm) {
      setIsOpen(false);
      return;
    }

    const isConfirmed = confirmClose();

    if (isConfirmed) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        New Escrow
      </Button>

      {isOpen && (
        <EscrowsActiveConsumer>
          {({ addItem }) => (
            <AddNewEscrowPopup onClose={handleClose} onCreateEscrow={addItem} />
          )}
        </EscrowsActiveConsumer>
      )}
    </>
  );
}
