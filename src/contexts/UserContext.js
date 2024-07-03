// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [medico, setMedico] = useState(null);

  return (
    <UserContext.Provider value={{ medico, setMedico }}>
      {children}
    </UserContext.Provider>
  );
};
