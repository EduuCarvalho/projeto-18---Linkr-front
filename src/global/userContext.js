import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [TOKEN, setTOKEN] = useState('');

    return (
        <UserContext.Provider value={{TOKEN, setTOKEN}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;