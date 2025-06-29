import React, {useContext, createContext, type ReactNode, useState} from "react";

type AuthContextType = {
    refresh: ()=> Promise<number>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=>{
    let [isAuthenticated, setIsAuthenticated] = useState(false);
    const refresh = async (): Promise<number>=>{
        let baseUrl = import.meta.env.VITE_API_URL 

        let response = await fetch(`${baseUrl}/auth/refresh`, {
            credentials: "include"
        })

        return response.status
    }

    return(
       <AuthContext.Provider value={{refresh, isAuthenticated, setIsAuthenticated}}>
            {children}
       </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("Context must be used within context provider");

    return context;
}