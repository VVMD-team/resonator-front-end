import { getActiveEscrows } from "@/modules/escrow/api";
import createItemsContext from "@/context/ItemsContext";

const [Provider, useItems, Consumer] = createItemsContext();

const requestActiveEscrows = async () => {
  try {
    const escrows = await getActiveEscrows();

    return escrows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const EscrowsActiveConsumer = Consumer;

export const useEscrowsActive = () => {
  const { items } = useItems();

  return items;
};

export default function EscrowsActiveProvider({ children }) {
  return <Provider requestItems={requestActiveEscrows}>{children}</Provider>;
}
