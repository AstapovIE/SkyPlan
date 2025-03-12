"use client"

import {createContext, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const Authcontext = createContext();

export const AuthProvider = ({children})=>
{
    const [user, setUser]=useState(null);
    const router = useRouter()

    const login = async(username, password)=>{
        try{
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            const response = await axios.post('http://localhost:8000/auth/login',  { username, password },
                {
                    headers:{ 'Content-Type': 'application/json'}
                }
            );
            axios.defaults.headers.common['Authorization'] = 'Bearer ${response.data.access_token}';
            localStorage.setItem('token', response.data.access_token)
            setUser(response.data);
            router.push('/');
        }
        catch(error){
            console.error('Login failed:', error);
        }
    };

    const logout = ()=>{
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        router.push('auth/login');
    };
    return ( <Authcontext.Provider value={{user, login, logout}}>
        {children}
    </Authcontext.Provider>);
};

export default Authcontext;