import React, { createContext, useState } from 'react';

export const ModalContext = createContext(null);

export function ModalContextProvider({ children }) {
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(null);

  const defaultContext = {
    checked,
    setChecked,
    data,
    setData,
    value,
    setValue,

  };

  return <ModalContext.Provider value={defaultContext}>{children}</ModalContext.Provider>;
}
