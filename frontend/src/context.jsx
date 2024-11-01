import React, { createContext, useContext, useState } from "react";

const SelectedIndexContext = createContext();

export const useSelectedIndex = () => useContext(SelectedIndexContext);

export const SelectedIndexProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <SelectedIndexContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </SelectedIndexContext.Provider>
  );
};
