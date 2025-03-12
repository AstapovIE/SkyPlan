"use client"

import { useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Authcontext from "../authstuff/authcontext";

const ProtectedRoute = ({children}) =>{
    const{user}=useContext(Authcontext);
    const router = useRouter();

    useEffect(()=>{
        if (!user){
            router.push('/login');
        }
    }, [user, router]);

    return user ? children: null;
};

export default ProtectedRoute;