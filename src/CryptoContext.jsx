import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
        // add more currency symbols here

    }, [currency]);

  // Pass a value prop to the Provider
  return <Crypto.Provider value={{currency,symbol,setCurrency}}>{children}</Crypto.Provider>;
};

export default CryptoContext;


// named export and should be imported within {CryptoState}
export const CryptoState = () => {
  return useContext(Crypto);
};
