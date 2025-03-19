"use client"
import {createContext, useState, useContext} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginForm } from "../login/_components/LoginForm";
import { redirect } from "next/navigation";


const Usercontext = createContext();

export const UserProvider = ({children})=>
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
                router.push('/survay');
                //redirect("/survay");
            }
            catch(error){
                console.error('Login failed:', error);
            }
        };
    
        const logout = ()=>{
            setUser(null);
            delete axios.defaults.headers.common['Authorization'];
            router.push('/');
        };

        return ( 
        <Usercontext.Provider value={{user, login, logout}}>
            {children}
        </Usercontext.Provider>
        );
    };
    
export default Usercontext;