"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export default function createItemsContext() {
  const ItemsContext = createContext();

  function ItemsProvider({ children, requestItems }) {
    const [items, setItems] = useState([]);

    const addItem = useCallback((newItem) => {
      setItems((items) => [newItem, ...items]);
    }, []);

    useEffect(() => {
      const getItems = async () => {
        const data = await requestItems();

        setItems(data);
      };

      getItems();
    }, []);

    return (
      <ItemsContext.Provider value={{ items, addItem }}>
        {children}
      </ItemsContext.Provider>
    );
  }
  const ItemsConsumer = ItemsContext.Consumer;

  const useItems = () => {
    const context = useContext(ItemsContext);

    if (typeof context === "undefined") {
      throw new Error("useItems must be user in a ItemsContext");
    }

    return context;
  };

  return [ItemsProvider, useItems, ItemsConsumer];
}
