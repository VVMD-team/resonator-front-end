"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (typeof context === "undefined") {
    throw new Error("useSearch must be user in a SearchContext");
  }

  return context;
};
