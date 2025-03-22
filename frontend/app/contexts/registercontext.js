"use client";
import {createContext, useState, useContext,  useCallback} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const Newcontext = createContext();

export const NewProvider = ({children})=>
    {
        const [user, setUser] = useState(null);
        const router = useRouter();

        const register = useCallback(async (username, password) => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/auth/register",
                    { username, password },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                setUser({ username });
                router.push("/survay"); 
            } catch (error) {
                console.error("Registration failed:", error.response?.data || error.message);
            }
        }, [router]); 
    
        return (
            <Newcontext.Provider value={{ user, register }}>
                {children}
            </Newcontext.Provider>
        );
    };
    
    export default Newcontext;