import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchCategory, setSearchCategory] = useState("");

  return (
    <SearchContext.Provider value={{ searchCategory, setSearchCategory }}>
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);
