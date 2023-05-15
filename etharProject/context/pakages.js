import React, { useState, createContext } from "react";

const PacakgeContext = createContext();

const PackageProvider = ({ children }) => {
    const [Packages, setPackage] = useState([]);

    return (
        <PacakgeContext.Provider value={[Packages, setPackage]}>
            {children}
        </PacakgeContext.Provider>
    );
};

export { PacakgeContext, PackageProvider };