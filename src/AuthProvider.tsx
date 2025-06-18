import {useContext, createContext, useState, type ReactNode} from "react";

type AuthContextType = {
    token:string|null;
    login: (token:string)=>void;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=>{

    const [token, setToken] = useState<string|null>(()=>sessionStorage.getItem("token"));

    const login = (token:string)=>{
        sessionStorage.setItem("token", token);
        setToken(token);
    }

    const logout = ()=>{
        sessionStorage.removeItem("token");
        setToken(null)
    }

    return(
       <AuthContext.Provider value={{token, login, logout}}>
            {children}
       </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("Context must be used within context provider");

    return context;
}