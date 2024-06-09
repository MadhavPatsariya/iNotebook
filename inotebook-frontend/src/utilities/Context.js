import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
    const [name, setName] = useState('User');
    return(
        <Context.Provider value = {{name, setName}}>
            {children}
        </Context.Provider>
    );
};

export {Context, ContextProvider};